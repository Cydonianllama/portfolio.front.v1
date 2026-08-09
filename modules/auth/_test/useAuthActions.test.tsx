// _____________ Tests de useAuthActions (orientados a comportamiento)
//
// Filosofía de estos tests:
//  - Protegen el comportamiento observable de la aplicación:
//      * qué servicio se invoca y con qué datos
//      * qué ocurre ante: éxito, rechazo del backend y excepción inesperada
//      * persistencia del token, navegación y notificaciones
//  - NO prueban detalles internos: llamadas/orden de `setState`, nombres de
//    flags, ni textos exactos de toasts.
//  - Los mocks de los servicios están TIPADOS con la firma real (vi.mocked),
//    así que si el contrato del backend cambia, TypeScript marca los tests
//    en lugar de dejar que fallen silenciosamente en producción.
//
//  Regla de oro: si mañana refactorizas la implementación interna y el
//  comportamiento sigue igual, estos tests deben seguir pasando.

import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ResponseApi } from "@/types/api/response";


// Stores reales (sin mock): los usamos porque solo necesitamos su ESTADO,
// no su implementación. Se resetea lo relevante en beforeEach.
import { useForgetPass } from "../store/forgetPassStore";
import { useInvite } from "@/modules/invite/store";

// Servicios reales importados PARA TIPAR sus mocks (vi.mocked deriva la firma).
import { Login } from "@/api/auth/signin";
import { RegisterUser } from "@/api/auth/register";
import { ForgetPassword } from "@/api/auth/forgetpass";
import { ChangePassword } from "@/api/auth/changepass";
import { VerifyAccount } from "@/api/auth/verify";
import { useAuthActions } from "../actions/useAuthActions";

// ---------------------------------------------------------------------------
// Límites que mockeamos: router de Next, notificaciones y cookies.
// ---------------------------------------------------------------------------
const mocks = vi.hoisted(() => {
  const router = { replace: vi.fn() };
  const toast = { success: vi.fn(), error: vi.fn() };
  const cookies = { set: vi.fn() };
  return { router, toast, cookies };
});

vi.mock("next/navigation", () => ({ useRouter: () => mocks.router }));
vi.mock("sonner", () => ({ toast: mocks.toast }));
vi.mock("js-cookie", () => ({ default: mocks.cookies }));

// Los servicios se mockean con vi.fn() y luego se tipan con vi.mocked(Service):
// de esa forma `mockResolvedValue` valida la forma de la respuesta contra el
// tipo real que la acción consume.
vi.mock("@/api/auth/signin", () => ({ Login: vi.fn() }));
vi.mock("@/api/auth/register", () => ({ RegisterUser: vi.fn() }));
vi.mock("@/api/auth/forgetpass", () => ({ ForgetPassword: vi.fn() }));
vi.mock("@/api/auth/changepass", () => ({ ChangePassword: vi.fn() }));
vi.mock("@/api/auth/verify", () => ({ VerifyAccount: vi.fn() }));

// Mocks tipados con la firma real de cada servicio.
const loginMock = vi.mocked(Login);
const registerMock = vi.mocked(RegisterUser);
const forgetPassMock = vi.mocked(ForgetPassword);
const changePassMock = vi.mocked(ChangePassword);
const verifyMock = vi.mocked(VerifyAccount);

// ---------------------------------------------------------------------------
// Factory de respuestas: modela al backend. Si el contrato de la API cambia,
// lo tocas en un solo lugar y TypeScript te marca TODOS los tests afectados,
// en vez de que fallen en silencio en producción.
// ---------------------------------------------------------------------------
const api = {
  ok: <T,>(data: T): ResponseApi<T> => ({ status: true, data }),
  fail: <T,>(message: string, data: T): ResponseApi<T> => ({ status: false, data, message }),
};

// ---------------------------------------------------------------------------
// Estado limpio para cada test: resetea mocks de límites y el estado relevante
// de los stores reales.
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();

  useForgetPass.setState({ code: "123456" });
  useInvite.setState({ invitationInformation: null });

  localStorage.clear();
});

describe("signinAction", () => {
  it("inicia sesión, persiste el token y redirige a home cuando la API confirma", async () => {
    loginMock.mockResolvedValue(api.ok({ token: "mi-token" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.signinAction({ email: "a@b.com", password: "123456" });
    });

    // El servicio de login se invoca con los datos del formulario
    expect(loginMock).toHaveBeenCalledWith("a@b.com", "123456");

    // El usuario queda autenticado (sesión persistida)
    expect(localStorage.getItem("token")).toBe("mi-token");
    expect(mocks.cookies.set).toHaveBeenCalledWith("token", "mi-token");

    // Redirige a home y notifica éxito
    expect(mocks.router.replace).toHaveBeenCalledWith("home");
    expect(mocks.toast.success).toHaveBeenCalledTimes(1);
  });

  it("no autentica ni redirige cuando la API rechaza las credenciales", async () => {
    loginMock.mockResolvedValue(api.fail("credenciales inválidas", { token: "" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.signinAction({ email: "a@b.com", password: "123456" });
    });

    // No queda ninguna sesión iniciada
    expect(localStorage.getItem("token")).toBeNull();

    // Se avisa el error, se limpia la sesión previa y NUNCA se redirige
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
    expect(mocks.toast.success).not.toHaveBeenCalled();
    expect(mocks.router.replace).not.toHaveBeenCalled();
  });

  it("no autentica ni redirige cuando la API responde sin token", async () => {
    // El backend responde status true pero con token vacío
    loginMock.mockResolvedValue(api.ok({ token: "" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.signinAction({ email: "a@b.com", password: "123456" });
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });

  it("muestra un error y no redirige si el servicio falla de forma inesperada", async () => {
    loginMock.mockRejectedValue(new Error("network down"));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.signinAction({ email: "a@b.com", password: "123456" });
    });

    // La acción no debe propagar el crash: avisa el error y no navega
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
    expect(mocks.router.replace).not.toHaveBeenCalled();
  });
});

describe("registerAction", () => {
  it("registra al usuario, persiste el token y redirige a verificación", async () => {
    registerMock.mockResolvedValue(api.ok({ token: "token-reg", userData: null }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.registerAction({ email: "a@b.com", password: "123456", fullname: "Ana" });
    });

    // El servicio de registro recibe los datos del formulario
    expect(registerMock).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "123456",
      fullname: "Ana",
    });

    // Queda autenticado y lo envían a verificar su cuenta
    expect(localStorage.getItem("token")).toBe("token-reg");
    expect(mocks.cookies.set).toHaveBeenCalledWith("token", "token-reg");
    expect(mocks.router.replace).toHaveBeenCalledWith("/verify");
    expect(mocks.toast.success).toHaveBeenCalledTimes(1);
  });

  it("no registra ni redirige cuando la API rechaza el registro", async () => {
    registerMock.mockResolvedValue(api.fail("email ya existe", { token: null, userData: null }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.registerAction({ email: "a@b.com", password: "123456", fullname: "Ana" });
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });

  it("maneja correctamente un error inesperado del servicio", async () => {
    registerMock.mockRejectedValue(new Error("network"));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.registerAction({ email: "a@b.com", password: "123456", fullname: "Ana" });
    });

    // No se persiste ni se navega; el usuario ve el error y el loading termina.
    // (El "loading termina" se garantiza con el finally del hook; aquí NO
    //  verificamos el setState interno - eso se cubriría a nivel componente.)
    expect(localStorage.getItem("token")).toBeNull();
    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });
});

describe("forgetPasswordAction", () => {
  it("solicita la recuperación y notifica éxito cuando el correo se envía", async () => {
    forgetPassMock.mockResolvedValue(api.ok({}));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.forgetPasswordAction({ email: "a@b.com" });
    });

    expect(forgetPassMock).toHaveBeenCalledWith({ email: "a@b.com" });
    expect(mocks.toast.success).toHaveBeenCalledTimes(1);
  });

  it("notifica el error cuando la API rechaza el correo", async () => {
    forgetPassMock.mockResolvedValue(api.fail("correo no registrado", {}));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.forgetPasswordAction({ email: "a@b.com" });
    });

    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
    expect(mocks.toast.success).not.toHaveBeenCalled();
  });

  it("notifica un error si el servicio falla de forma inesperada", async () => {
    forgetPassMock.mockRejectedValue(new Error("timeout"));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.forgetPasswordAction({ email: "a@b.com" });
    });

    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
    expect(mocks.toast.success).not.toHaveBeenCalled();
  });
});

describe("changePasswordAction", () => {
  it("envía la contraseña con el código vigente y redirige al login", async () => {
    // Simula que el código fue renovado (p.ej. reenviando el correo)
    useForgetPass.setState({ code: "999999" });
    changePassMock.mockResolvedValue(api.ok({ list: [] }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.changePasswordAction({ password: "nueva" });
    });

    // El servicio recibe la contraseña y el código de validación del store
    expect(changePassMock).toHaveBeenCalledWith({
      password: "nueva",
      validationCode: "999999",
    });

    // Redirige al login para ingresar con la nueva contraseña
    expect(mocks.router.replace).toHaveBeenCalledWith("login");
    expect(mocks.toast.success).toHaveBeenCalledTimes(1);
  });

  it("no redirige y notifica el error cuando la API rechaza el cambio", async () => {
    changePassMock.mockResolvedValue(api.fail("código expirado", { list: [] }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.changePasswordAction({ password: "nueva" });
    });

    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });

  it("notifica un error si el servicio falla de forma inesperada", async () => {
    changePassMock.mockRejectedValue(new Error("server"));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.changePasswordAction({ password: "nueva" });
    });

    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });
});

describe("verifyAccountAction", () => {
  it("verifica la cuenta, persiste el token y redirige a home sin invitación", async () => {
    verifyMock.mockResolvedValue(api.ok({ token: "token-ok" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.verifyAccountAction({ opt: "123456" });
    });

    expect(verifyMock).toHaveBeenCalledWith({ opt: "123456" });

    expect(localStorage.getItem("token")).toBe("token-ok");
    expect(mocks.cookies.set).toHaveBeenCalledWith("token", "token-ok");
    expect(mocks.router.replace).toHaveBeenCalledWith("home");
    expect(mocks.toast.success).toHaveBeenCalledTimes(1);
  });

  it("redirige al flujo de invitación cuando el usuario tiene una pendiente", async () => {
    verifyMock.mockResolvedValue(api.ok({ token: "token-ok" }));
    useInvite.setState({ invitationInformation: { invitation: { id: "inv-77", email: "x@x.com" } } });

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.verifyAccountAction({ opt: "123456" });
    });

    expect(mocks.router.replace).toHaveBeenCalledWith("/invite?invitationId=inv-77");
  });

  it("no persiste el token ni redirige cuando la API rechaza la verificación", async () => {
    verifyMock.mockResolvedValue(api.fail("código inválido", { token: "" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.verifyAccountAction({ opt: "000000" });
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });

  it("no persiste el token ni redirige cuando la respuesta no incluye token", async () => {
    verifyMock.mockResolvedValue(api.ok({ token: "" }));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.verifyAccountAction({ opt: "123456" });
    });

    // Sin token no hay sesión; no se rompe ni se navega (guard protector)
    expect(localStorage.getItem("token")).toBeNull();
    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });

  it("notifica un error si el servicio falla de forma inesperada", async () => {
    verifyMock.mockRejectedValue(new Error("network"));

    const { result } = renderHook(() => useAuthActions());
    await act(async () => {
      await result.current.verifyAccountAction({ opt: "123456" });
    });

    expect(mocks.router.replace).not.toHaveBeenCalled();
    expect(mocks.toast.error).toHaveBeenCalledTimes(1);
  });
});
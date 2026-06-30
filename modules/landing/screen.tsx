import Link from "next/link";
import {
  ChefHat,
  Users,
  Building2,
  MessagesSquare,
  Route,
  ArrowRight,
  Phone,
  AppWindow,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function LandingScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ChefHat className="size-6 text-red-600" />
            <span>cydo</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/me"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sobre el desarrollador
            </Link>
            <Button render={<Link href="/login" />} size="sm" variant="outline">
              Iniciar sesión
            </Button>
            <Button render={<Link href="/register" />} size="sm">
              Registrarse
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Automatiza tu restaurante con{" "}
              <span className="text-red-600">cydo</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Conecta tus redes sociales y centraliza la atención a tus clientes
              en una sola plataforma diseñada para negocios de restaurantes en
              Perú.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button render={<Link href="/register" />} size="lg">
                Empieza gratis <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button render={<Link href="/me" />} size="lg" variant="outline">
                Conoce al desarrollador
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Integraciones */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Integraciones listas para usar
              </h2>
              <p className="mt-4 text-muted-foreground">
                Comunícate con tus clientes donde ellos ya están.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <IntegrationCard
                icon={<Send className="size-6 text-sky-500" />}
                title="Telegram"
                description="Recibe pedidos, consultas y mensajes directos desde Telegram en tiempo real."
              />
              <IntegrationCard
                icon={<Phone className="size-6 text-green-600" />}
                title="WhatsApp"
                description="Atiende a tus clientes por WhatsApp y automatiza respuestas frecuentes."
              />
              <IntegrationCard
                icon={<AppWindow className="size-6 text-violet-500" />}
                title="Widget web"
                description="Añade un chat en tu sitio web para capturar leads sin complicaciones."
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Módulos */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Todo lo que necesitas para administrar tu negocio
              </h2>
              <p className="mt-4 text-muted-foreground">
                Módulos pensados para restaurantes que quieren crecer.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ModuleCard
                icon={<Users className="size-6 text-red-600" />}
                title="Contactos"
                description="Gestiona tu base de clientes y segmenta por canal de origen."
              />
              <ModuleCard
                icon={<Building2 className="size-6 text-red-600" />}
                title="Empresa"
                description="Configura la información de tu restaurante, horarios y datos clave."
              />
              <ModuleCard
                icon={<MessagesSquare className="size-6 text-red-600" />}
                title="Chat"
                description="Centraliza conversaciones de Telegram, WhatsApp y widget en un solo lugar."
              />
              <ModuleCard
                icon={<Route className="size-6 text-red-600" />}
                title="Seguimiento"
                description="Visualiza el historial de interacciones y el estado de cada conversación."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-red-600 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para transformar la atención de tu restaurante?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Únete a cydo y empieza a automatizar tu negocio hoy mismo.
            </p>
            <Button
              render={<Link href="/register" />}
              size="lg"
              variant="secondary"
              className="mt-8 bg-white text-red-600 hover:bg-white/90"
            >
              Crear cuenta gratis <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <ChefHat className="size-5 text-red-600" />
            <span>cydo</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} cydo. Automatización para restaurantes
            en Perú.
          </p>
          <div className="flex gap-4">
            <Link
              href="/me"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sobre el desarrollador
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IntegrationCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function ModuleCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

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
import { LuWebhook } from "react-icons/lu";
import { featureList, integrationList } from "./data";

export function LandingScreen() {
  return (
    <div className="flex min-h-screen flex-col text-foreground bg-landing">
      {/* bg-background  */}
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <LuWebhook className="size-6 text-brand-primary" />
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
              Automatiza tus flujos con <span className="text-landing-emphasize">Cydomation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Este proyecto aún está en desarrollo por lo que no te voy a meter palabras vacías. Flujos conversacionales para redes sociales y llamadas, workflow generales o especializado son las herramientas en desarrollo.
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

        {/* Módulos */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Todo lo que necesitas para administrar tu negocio
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nuestros módulos base te permitiran contruir la administracion de tu negocio
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featureList.map((el, index) => <ModuleCard
                key={index}
                icon={<Users className="size-6 text-red-600" />}
                title={el.title}
                description={el.description}
              />)}
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {integrationList.map((el, index) => <IntegrationCard
                key={index}
                icon={<Send className="size-6 text-sky-500" />}
                title={el.title}
                description={el.description}
              />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className=" bg-linear-65 from-purple-500 to-pink-500 px-4 py-20 text-white sm:px-6 lg:px-8">
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
              className="mt-8 bg-white text-brand-primary hover:bg-white/90"
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
            <LuWebhook className="size-5 text-brand-primary" />
            <span>cydomat</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} cydomat. Automatización
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

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function MeScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="size-5" />
            <span>Volver a cydo</span>
          </Link>
          <Button
            render={
              <Link
                href="https://github.com/Cydonianllama"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="sm"
            variant="outline"
          >
            <FaGithub className="mr-2 size-4" /> GitHub
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Perfil */}
          <section className="flex flex-col items-center gap-6 text-center">
            <Avatar size="lg" className="size-28 text-2xl">
              <AvatarFallback>EG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Erick Manuel Grandez Mendoza
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Desarrollador fullstack especializado en aplicaciones web con
                React, Next.js y Node.js.
              </p>
            </div>
            <Button
              render={
                <Link
                  href="https://github.com/Cydonianllama"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <FaGithub className="mr-2 size-4" /> Ver GitHub
            </Button>
          </section>

          <Separator className="my-12" />

          {/* Experiencia */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Briefcase className="size-6 text-red-600" />
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Experiencia laboral
              </h2>
            </div>
            <div className="grid gap-4">
              <ExperienceCard
                company="Plazbot"
                role="Desarrollador"
                period="5 años"
                description="Desarrollo de soluciones de software para automatización y atención al cliente en negocios."
              />
              <ExperienceCard
                company="Tempus"
                role="Soporte"
                period="6 meses"
                description="Soporte técnico y resolución de incidencias en entornos de software empresarial."
              />
            </div>
          </section>

          {/* Tecnologías */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Code2 className="size-6 text-red-600" />
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Tecnologías
              </h2>
            </div>
            <Card>
              <CardContent className="flex flex-wrap gap-2 pt-6">
                <TechBadge>Next.js</TechBadge>
                <TechBadge>React</TechBadge>
                <TechBadge>HTML</TechBadge>
                <TechBadge>CSS</TechBadge>
                <TechBadge>JavaScript avanzado</TechBadge>
                <TechBadge>Node.js</TechBadge>
                <TechBadge>Express</TechBadge>
                <TechBadge>MongoDB</TechBadge>
                <TechBadge>SQL Server</TechBadge>
                <TechBadge>CosmosDB</TechBadge>
              </CardContent>
            </Card>
          </section>

          {/* Proyectos */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <Layers className="size-6 text-red-600" />
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Proyectos
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ProjectCard
                title="cydo"
                description="Aplicación especializada en automatizar negocios de restaurantes en Perú. Conecta Telegram, WhatsApp y widget web."
                tags={["Next.js", "React", "TypeScript"]}
                href="/"
              />
              <ProjectCard
                title="Próximo proyecto"
                description="Aquí se irán agregando nuevos proyectos a medida que se desarrollen."
                tags={["Por definir"]}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Erick Manuel Grandez Mendoza
          </p>
          <Link
            href="https://github.com/Cydonianllama"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <FaGithub className="size-4" /> github.com/Cydonianllama
          </Link>
        </div>
      </footer>
    </div>
  );
}

function ExperienceCard({
  company,
  role,
  period,
  description,
}: {
  company: string;
  role: string;
  period: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{company}</CardTitle>
          <Badge variant="secondary">{period}</Badge>
        </div>
        <CardDescription className="text-base font-medium">
          {role}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return <Badge variant="outline" className="px-3 py-1 text-sm">{children}</Badge>;
}

function ProjectCard({
  title,
  description,
  tags,
  href,
}: {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{title}</CardTitle>
          {href && (
            <Link
              href={href}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Ver proyecto ${title}`}
            >
              <ExternalLink className="size-4" />
            </Link>
          )}
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { Metadata } from "next";

export const SITE_CONFIG: Metadata = {
    title: {
        default: "Cold Start",
        template: "%s | Cold Start"
    },
    description: "Aplicação para gerenciar a temperatura dos containers de teste, permitindo monitoramento em tempo real, ajustes precisos e alertas automáticos para garantir condições ideais durante os processos de teste.",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico"
            }
        ]
    },
    openGraph: {

        title: "Cold Start",
        description: "Aplicação para gerenciar a temperatura dos containers de teste, permitindo monitoramento em tempo real, ajustes precisos e alertas automáticos para garantir condições ideais durante os processos de teste.",
        images: [
            {
                url: "/assets/dashboard.jpeg",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@coldstart",
        title: "Cold Start",
        description: "Aplicação para gerenciar a temperatura dos containers de teste, permitindo monitoramento em tempo real, ajustes precisos e alertas automáticos para garantir condições ideais durante os processos de teste.",
        images: [
            {
                url: "/assets/dashboard.jpeg",
            }
        ]
    },
    metadataBase: new URL("http://localhost:3000")
}
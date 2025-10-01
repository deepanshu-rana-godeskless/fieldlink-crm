"use client";
import Link from "next/link";
import { useLocale } from "@/context/locale-context";

export default function Dashboard() {
  const { t } = useLocale();

  // Generate a lot of content
  const sections = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">{t("dashboard.title")}</h1>
      <p className="text-lg mb-6">{t("dashboard.welcome")}</p>
      <Link href="/dashboard/reports">
        <button className="mb-8 px-4 py-2 bg-foreground text-background rounded hover:bg-gray-800 transition-colors">
          {t("dashboard.reportsButton")}
        </button>
      </Link>

      {sections.map((num) => (
        <section key={num} className="p-6 bg-muted/20 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Section {num}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. 
            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          </p>
          <p>
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. 
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. 
            Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
            Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
        </section>
      ))}
    </div>
  );
}

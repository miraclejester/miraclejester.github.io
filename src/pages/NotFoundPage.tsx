import Container from "@/components/Container";
import Button from "@/components/Button";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="flex flex-1 items-center py-24">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="text-fg">Page not found</h1>
          <p className="text-base leading-relaxed text-fg-muted">
            That page doesn&rsquo;t exist or has moved.
          </p>
          <div className="mt-2">
            <Button href="/">Back to home</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

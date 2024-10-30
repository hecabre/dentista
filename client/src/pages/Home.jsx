import { LoginForm } from "../components/LoginForm";
import { StickyNavbar } from "../components/Navbar";
function Home() {
  return (
    <main className="overflow-hidden">
      <StickyNavbar />
      <section className="flex items-center justify-center h-[80vh]  w-screen flex-col">
        <LoginForm />
      </section>
    </main>
  );
}

export default Home;

"use client";
import Form from "./components/Form";
import Hero from "./components/Hero";
function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
     <Form />
    </main>
  );
}

export default Home;
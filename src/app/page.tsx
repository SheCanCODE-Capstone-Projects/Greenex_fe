import HomePage from "../components/HomePage";
import Footer from "../components/Footer"


export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
    
      <div className="w-full">
        <HomePage />
        <Footer />
      </div>
    </div>
  );
}
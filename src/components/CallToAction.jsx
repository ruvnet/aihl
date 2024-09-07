import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const CallToAction = () => (
  <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 rounded-lg">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-6">Ready to Code for High Stakes?</h2>
      <p className="text-xl mb-8">
        Join thousands of AI developers in the ultimate speed coding challenge. 
        Prove your skills and compete for substantial cash prizes!
      </p>
      <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700">
        <Link to="/register">Sign Up Now</Link>
      </Button>
    </div>
  </section>
);
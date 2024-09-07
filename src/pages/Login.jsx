import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/supabase';
import { toast } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      toast.error(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
          </div>
          <div className="mt-4 text-center">
            <p>
              Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
            </p>
          </div>
          <div className="mt-6">
            <p className="text-center mb-2">Or login with:</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('github')}>
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('linkedin')}>
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
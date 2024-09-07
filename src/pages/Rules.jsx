import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Rules = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-6">AI Hacking League Rules</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>1. Competition Format</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Challenges are categorized as: Sprint (15 minutes), Dash (30 minutes), or Marathon (60 minutes).</li>
            <li>Participants may compete solo or in teams of up to three members.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Code Qualifiers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>All code must be original and created during the challenge timeframe.</li>
            <li>Pre-written code, templates, or frameworks are prohibited unless explicitly allowed.</li>
            <li>Code must be submitted to the league's official repository for verification.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Approved Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Participants may only use official league-approved:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Libraries</li>
            <li>APIs</li>
            <li>AI models (including LLMs)</li>
            <li>Development tools</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. AI Judging System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>An AI-based judging system evaluates submissions based on:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Functionality</li>
            <li>Innovation</li>
            <li>Code quality</li>
            <li>User experience</li>
          </ul>
          <p>The AI judge's decision is final, with a human oversight committee for appeals.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Anti-Cheating Measures</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI-powered plagiarism detection tools analyze all submissions.</li>
            <li>Participants caught cheating face immediate disqualification and potential league bans.</li>
            <li>Challenges are monitored in real-time by AI systems to detect unauthorized assistance.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Ethical Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>All AI applications developed must adhere to ethical AI principles.</li>
            <li>The league promotes responsible AI development and usage.</li>
            <li>Applications that violate ethical guidelines will be disqualified.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
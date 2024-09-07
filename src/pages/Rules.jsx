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
          <p>The AI Hacking League consists of timed challenges where participants build AI applications within strict time limits. Challenges are categorized as follows:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sprint:</strong> 15 minutes - Quick, intense coding sessions focusing on rapid problem-solving and implementation.</li>
            <li><strong>Dash:</strong> 30 minutes - Balanced challenges requiring both quick thinking and more complex solution development.</li>
            <li><strong>Marathon:</strong> 60 minutes - Extended sessions for tackling more intricate AI problems and developing comprehensive solutions.</li>
          </ul>
          <p className="mt-4">Participants may compete solo or in teams of up to three members. Team roles are flexible but typically include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>UI/UX Developer</li>
            <li>Algorithm/Middleware Specialist</li>
            <li>DevOps/Integration Engineer</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Code Qualifiers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>All code must be original and created during the challenge timeframe. This ensures a level playing field and promotes genuine innovation.</li>
            <li>Pre-written code, templates, or frameworks are prohibited unless explicitly allowed by the challenge rules. This restriction encourages participants to showcase their real-time problem-solving and coding skills.</li>
            <li>Code must be submitted to the league's official repository for verification. This allows for transparent evaluation and prevents any post-challenge modifications.</li>
            <li>Submissions will undergo rigorous automated checks for plagiarism and adherence to challenge-specific requirements.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Approved Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>To maintain fairness and focus on AI development skills, participants may only use official league-approved resources, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Libraries:</strong> A curated list of AI and machine learning libraries will be provided for each challenge. These may include popular frameworks like TensorFlow, PyTorch, or scikit-learn.</li>
            <li><strong>APIs:</strong> Specific AI services or APIs may be allowed, depending on the challenge requirements. These could include cloud-based AI services or specialized AI tools.</li>
            <li><strong>AI models:</strong> Pre-trained models or Large Language Models (LLMs) may be permitted for certain challenges, with clear guidelines on their usage.</li>
            <li><strong>Development tools:</strong> Standard IDEs, code editors, and version control systems are allowed. Any specialized tools will be explicitly mentioned in the challenge description.</li>
          </ul>
          <p className="mt-4">The list of approved resources will be updated regularly and made available to all participants before each challenge.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. AI Judging System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>An advanced AI-based judging system evaluates submissions to ensure fair and consistent scoring across all entries. The evaluation criteria include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Functionality:</strong> How well does the solution solve the given problem? Does it meet all specified requirements?</li>
            <li><strong>Innovation:</strong> Does the solution present novel approaches or creative use of AI technologies?</li>
            <li><strong>Code quality:</strong> Is the code well-structured, efficient, and following best practices in AI development?</li>
            <li><strong>User experience:</strong> If applicable, how intuitive and user-friendly is the solution?</li>
          </ul>
          <p className="mt-4">The AI judge's decision is final. However, a human oversight committee is in place to handle appeals and ensure the integrity of the judging process. Participants may submit an appeal within 24 hours of receiving their results if they believe there has been a significant error in the evaluation.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Anti-Cheating Measures</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The AI Hacking League employs strict measures to maintain the integrity of the competition:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>AI-powered plagiarism detection:</strong> All submissions undergo thorough analysis to detect any instances of code plagiarism or unauthorized use of pre-written solutions.</li>
            <li><strong>Real-time monitoring:</strong> AI systems monitor the coding process during challenges to detect any suspicious activities or unauthorized assistance.</li>
            <li><strong>Verification checks:</strong> Random code reviews and participant interviews may be conducted to verify the authenticity of solutions.</li>
            <li><strong>Penalties:</strong> Participants caught cheating face immediate disqualification from the current challenge and may receive temporary or permanent bans from future league events.</li>
          </ul>
          <p className="mt-4">The league encourages fair play and ethical behavior. Any concerns about potential cheating should be reported to the league administrators promptly.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Ethical Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The AI Hacking League is committed to promoting responsible AI development:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All AI applications developed during challenges must adhere to ethical AI principles, including fairness, transparency, privacy, and security.</li>
            <li>Solutions that demonstrate bias, discriminatory behavior, or potential for harmful applications will be disqualified.</li>
            <li>Participants are encouraged to consider the societal impact of their AI solutions and prioritize beneficial applications.</li>
            <li>The league may include specific ethical guidelines or constraints in challenge descriptions to promote responsible AI development.</li>
          </ul>
          <p className="mt-4">By participating in the AI Hacking League, developers contribute to advancing AI technology while upholding high ethical standards.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Participants retain the intellectual property rights to their creations.</li>
            <li>By submitting solutions, participants grant the AI Hacking League a non-exclusive license to showcase and promote their work within the context of the competition.</li>
            <li>The league encourages open-source contributions and may provide additional recognition for solutions released under open-source licenses.</li>
            <li>Any use of third-party intellectual property must comply with applicable licenses and be clearly attributed in the submission.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. League Seasons and Championships</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>The AI Hacking League operates in seasons, typically lasting 3-4 months each.</li>
            <li>Regular challenges occur throughout the season, with points accumulated based on performance.</li>
            <li>Each season culminates in a championship event featuring high-stakes challenges and increased rewards.</li>
            <li>Season champions are determined by a combination of cumulative points from regular challenges and performance in the championship event.</li>
            <li>Special awards may be given for categories such as Most Innovative Solution, Best Newcomer, or Ethical AI Champion.</li>
          </ul>
        </CardContent>
      </Card>

      <p className="text-lg mt-8">
        These rules are subject to periodic updates to ensure fair competition and align with advancements in AI technology. Participants are encouraged to review the rules regularly and reach out to league administrators with any questions or clarifications.
      </p>
    </div>
  );
};

export default Rules;
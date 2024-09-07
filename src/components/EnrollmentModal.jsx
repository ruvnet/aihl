import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const EnrollmentModal = ({ isOpen, onClose, challenge }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    // TODO: Implement actual enrollment logic here, including payment processing
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
    setIsEnrolling(false);
    onClose();
    // TODO: Show success message or update UI to reflect enrollment
  };

  if (!challenge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enroll in Challenge</DialogTitle>
          <DialogDescription>
            You are about to enroll in the "{challenge.title}" challenge.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          <p><strong>Current Participants:</strong> {challenge.participants}</p>
          <p><strong>Buy-in Amount:</strong> ${challenge.buyIn}</p>
          <p><strong>Potential Prize:</strong> {challenge.prize.amount} {challenge.prize.currency}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleEnroll} disabled={isEnrolling}>
            {isEnrolling ? 'Processing...' : `Confirm Enrollment ($${challenge.buyIn})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;
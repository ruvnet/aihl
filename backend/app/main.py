import os
import signal
import subprocess
from fastapi import FastAPI
from app.api.api import api_router
from app.db.session import engine
from app.db.base import Base

def kill_process_on_port(port):
    try:
        # Find the process ID (PID) using the port
        result = subprocess.run(['lsof', '-ti', f':{port}'], capture_output=True, text=True)
        pid = result.stdout.strip()
        
        if pid:
            # Kill the process
            os.kill(int(pid), signal.SIGTERM)
            print(f"Killed process {pid} running on port {port}")
    except subprocess.CalledProcessError:
        # No process found on the port
        pass
    except Exception as e:
        print(f"Error killing process on port {port}: {e}")

# Kill any process running on port 8000
kill_process_on_port(8000)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Hacking League Backend")

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
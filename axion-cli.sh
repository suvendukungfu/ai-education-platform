#!/bin/bash

# --- AXION INTELLIGENCE PLATFORM CLI ---
# The Interactive Portfolio Orchestrator

# Colors for high-fidelity output
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

clear
echo -e "${BLUE}${BOLD}===================================================${NC}"
echo -e "${BLUE}${BOLD}          AXION INTELLIGENCE PLATFORM CLI          ${NC}"
echo -e "${BLUE}${BOLD}===================================================${NC}"
echo -e "Developed for Senior-Level Project Evaluation Milestone"
echo

show_menu() {
    echo -e "${CYAN}Select an operation to perform:${NC}"
    echo -e "1) ${BOLD}Start Platform${NC} (Unified Dev Mode)"
    echo -e "2) ${BOLD}Launch Orchestration${NC} (Docker Compose)"
    echo -e "3) ${BOLD}Run Health Probe${NC} (System-wide Diagnostics)"
    echo -e "4) ${BOLD}Execute Test Suite${NC} (Vitest Full-Stack)"
    # The deploy.sh is in project/deploy.sh
    echo -e "5) ${BOLD}Deploy to Vercel${NC} (Cloud Sync)"
    echo -e "6) ${BOLD}View System Docs${NC} (Evaluator Guided Tour)"
    echo -e "7) ${BOLD}Exit CLI${NC}"
    echo
}

while true; do
    show_menu
    read -p "Enter choice [1-7]: " choice
    case $choice in
        1)
            echo -e "${GREEN}🚀 Launching Unified Dev Mode...${NC}"
            bash ./start-platform.sh
            ;;
        2)
            echo -e "${GREEN}🐳 Starting Docker Orchestration...${NC}"
            cd project && docker-compose up -d
            ;;
        3)
            echo -e "${GREEN}🏥 Probing System Health...${NC}"
            bash ./project/scripts/check-system.sh
            ;;
        4)
            echo -e "${GREEN}🧪 Executing Test Suite...${NC}"
            cd project/backend && npm test
            cd ../frontend && npm test
            ;;
        5)
            echo -e "${GREEN}📦 Triggering Vercel Deployment...${NC}"
            bash ./project/deploy.sh
            ;;
        6)
            echo -e "${GREEN}📄 Opening Documentation...${NC}"
            cat project/docs/EVALUATOR_GUIDE.md
            ;;
        7)
            echo -e "${RED}👋 Exiting Axion CLI. Imperial Lockdown Complete.${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid selection. Please try again.${NC}"
            ;;
    esac
    echo
    read -p "Press Enter to return to menu..."
done

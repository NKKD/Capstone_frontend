export default class RobotService {

    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getRobotConnection(robotIP, robotPortNumber){
        let response = await fetch(this.baseUrl + "/api/robot?robotIP=" + robotIP + "&robotPortNumber=" + robotPortNumber);
        // http://localhost:3000/api/robot?robotIP=192.168.1.11&robotPortNumber=9090
        let robotConnectionResponse = await response.json()
        return robotConnectionResponse;
    }

    async getRobotIMU(){
        let response = await fetch(this.baseUrl + "/api/robot/imu");
        let games = await response.json()
        return games;
    }

    async getRobotVoltage(){
        let response = await fetch(this.baseUrl + "/api/robot/voltage");
        let games = await response.json()
        return games;
    }

    async postRGBEffect(RGBEffectID) {
        const response = await fetch(`${this.baseUrl}/api/robot/rgb/{id}?id=${RGBEffectID}`, {
            method: 'POST'
        });
        // http://localhost:3000/api/robot/rgb/{id}?id=1
        if (!response.ok) {
            throw new Error('Failed to post RGB Effect');
        }
        return await response.json();
    }

    async postRobotMovement(robotMovement) {
        const response = await fetch(`${this.baseUrl}/api/robot/movement?linearX=${robotMovement.linearX}&linearY=${robotMovement.linearY}&angularZ=${robotMovement.angularZ}`, {
            method: 'POST'
        });
        // http://localhost:3000/api/robot/movement?linearX=0&linearY=0&angularZ=0
        if (!response.ok) {
            throw new Error('Failed to post robot movement');
        }
        return await response.json();
    }

    async postRobotEstop() {
        const response = await fetch(`${this.baseUrl}/api/robot/estop`, {
            method: 'POST'
        });
        // http://localhost:3000/api/robot/estop
        if (!response.ok) {
            throw new Error('Failed to post E stop');
        }
        return await response.json();
    }
}

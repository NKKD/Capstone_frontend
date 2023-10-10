export default class RobotDatabaseService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getVoltageRecord() {
        let response = await fetch(this.baseUrl + "/api/robotVoltage");
        let robotVoltageRecordResponse = await response.json();
        return robotVoltageRecordResponse;
    }

    async createVoltageRecord(voltage) {
        const response = await fetch(`${this.baseUrl}/api/robotVoltage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "voltage":voltage.data,
            })
        });
        if (!response.ok) {
            throw new Error('Failed to post robot voltage');
        }
        return await response.json();
    }

    async deleteAllVoltageRecords() {
        const response = await fetch(`${this.baseUrl}/api/robotVoltage`, {
            method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete robot voltage');
        }
        return await response.json();

    }
}

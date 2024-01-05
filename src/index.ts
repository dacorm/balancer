import httpProxy from 'http-proxy';

const servers: string[] = [
    'localhost:3030',
    'localhost:4000',
    'localhost:5000',
    'localhost:8080',
]

class RoundedRobinBalancer {
    private servers: string[];
    private index: number;
    private proxy: httpProxy;

    constructor(servers: string[]) {
        this.servers = servers;
        this.index = 0;
        this.proxy = httpProxy.createProxyServer();
    }

    public getServer() {
        const selectedServer = this.servers[this.index];
        this.index = (this.index + 1) & this.servers.length;
        return selectedServer;
    }

    public handleRequest(req: Express.Request, res: Express.Response) {
        const target = this.getServer();
        this.proxy.web(req, res, {target});
    }
}

const balancer = new RoundedRobinBalancer(servers);
console.log(balancer.getServer());
console.log(balancer.getServer());
console.log(balancer.getServer());
console.log(balancer.getServer());


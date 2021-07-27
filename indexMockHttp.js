(async () => {
    const mockttp = require('mockttp');

    // Create a proxy server with a self-signed HTTPS CA certificate:
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });

    // Inject 'Hello world' responses for all requests
    server.anyRequest().thenReply(200, "Hello world");
    await server.start();

    // Print out the server details:
    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert)
    console.log(`Server running on port ${server.port}`);
    console.log(`CA cert fingerprint ${caFingerprint}`);
})(); // (Run in an async wrapper so we can use top-level await everywhere
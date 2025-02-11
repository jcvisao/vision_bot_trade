// Minimal stub to define CarregadorConfigNode and expose it globally.
class CarregadorConfigNode {
    constructor(id) {
        this.id = id;
        // ...existing implementation...
        console.log(`CarregadorConfigNode ${id} initialized.`);
    }
    // ...other methods...
}
// Export to global scope so it is available to index.html.
window.CarregadorConfigNode = CarregadorConfigNode;

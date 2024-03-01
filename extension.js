const vscode = require('vscode');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.openWebsite', function () {
        const panel = vscode.window.createWebviewPanel(
            'websiteViewer',
            'Localhost Website Viewer',
            vscode.ViewColumn.One,
            {
                // Enable loading content from insecure (HTTP) sources
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file('../Codedhayn/localhost:5173/')],
                // Set your localhost path as the localResourceRoots
            }
        );

        const htmlFilePath = vscode.Uri.file(path.join(context.extensionPath, 'webview_index.html'));

        // Read the HTML file and set it as the content of the WebView
        vscode.workspace.openTextDocument(htmlFilePath).then(document => {
            panel.webview.html = document.getText();
        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

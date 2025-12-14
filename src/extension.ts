// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TARGET_FILE_PATTERNS } from './constants';
import {
  createMarkdown,
  isInsideBrandingSection,
  parseBranding
} from './utils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "github-actions-branding-preview" is now active!'
  );

  const hoverProvider = vscode.languages.registerHoverProvider(
    TARGET_FILE_PATTERNS.map((pattern) => ({ pattern })),
    {
      provideHover(document, position) {
        try {
          console.debug(
            `Hover triggered in ${document.fileName} at ${position.line}:${position.character}`
          );

          const text = document.getText();

          // Do nothing unless cursor is inside the branding section
          if (!isInsideBrandingSection(text, position.line)) {
            console.debug(`Hover triggered outside branding`);
            return undefined;
          }

          const branding = parseBranding(text);
          if (!branding) {
            return undefined;
          }

          createMarkdown(branding);

          return new vscode.Hover(new vscode.MarkdownString('ok'));
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          console.error(`Error in provideHover: ${message}`);
          return;
        }
      }
    }
  );

  context.subscriptions.push(hoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}

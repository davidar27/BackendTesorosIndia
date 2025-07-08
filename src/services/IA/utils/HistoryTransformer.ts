export function transformHistoryForGoogleGenAI(history: any[]): any[] {
    if (!Array.isArray(history)) {
        return [];
    }

    return history.map(message => {
        const role = message.role === "assistant" ? "model" : 
                    message.role === "user" ? "user" : 
                    "user"; 

        return {
            role: role,
            parts: [{ text: message.content || message.message || "" }]
        };
    }).filter(message => 
        message.parts[0].text && 
        message.parts[0].text.trim().length > 0
    );
} 
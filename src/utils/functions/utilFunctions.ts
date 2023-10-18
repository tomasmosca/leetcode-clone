interface VariablesOutput {
    [key: string]: any;
}

export function extractVariables(inputString: string): VariablesOutput {
    let result: VariablesOutput = {};
    // Match variable assignments in the form "variable = value"
    const regex = /(\w+)\s*=\s*([\s\S]*?)(?=\w+\s*=|$)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(inputString)) !== null) {
        const variableName = match[1];
        const variableValue = match[2].trim().replace(/,$/, ''); // remove any trailing comma

        // Check if it's a string value
        if (/^["'].*["']$/.test(variableValue)) {
            result[variableName] = variableValue.slice(1, -1);
        } else {
            // Safely evaluate the matched value
            try {
                const safeEval = new Function(`return ${variableValue}`);
                result[variableName] = safeEval();
            } catch (error) {
                console.error(`Error evaluating variable value for "${variableName}": ${(error as Error).message}`);
            }
        }
    }
    return result;
}

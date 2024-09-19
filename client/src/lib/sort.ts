function parseDescription(description: string) {
    const lines = description.trim().split('\n');
    const result: { [key: string]: string } = {};
    
    lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        if (key && value) {
            result[key] = value;
        }
    });

    return result;
}

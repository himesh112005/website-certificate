async function generateCert() {
    const name = document.getElementById('fullName').value;
    const skill = document.getElementById('certType').value;
    
    // Update preview
    document.getElementById('certName').textContent = name;
    document.getElementById('certSkill').textContent = skill;
    document.getElementById('certDate').textContent = 
        new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const preview = document.getElementById('certPreview');
    preview.style.display = 'block';

    // Confetti effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Generate PDF content
    const certHTML = `
        <div style="padding: 40px; font-family: 'Roboto', sans-serif;">
            <h1 style="color: #4CAF50; text-align: center;">Certificate of Making your self april fool</h1>
            <p style="font-size: 1.2em; line-height: 1.6;">
                This certifies that <strong>${name}</strong> has demonstrated exceptional skills in <strong>${skill}</strong>.
                Valid until: ${new Date().toLocaleDateString()}
            </p>
            <div style="position: absolute; bottom: 20px; right: 40px; text-align: right;">
                <p>Certify Institute</p>
                <h1>Happy April Fool Day in advance from Himesh Raghuwanshi</h1>
            </div>
        </div>
    `;

    // Send to backend
    try {
        const response = await fetch('/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: certHTML })
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Certificate generation failed. Try again!');
    }
}
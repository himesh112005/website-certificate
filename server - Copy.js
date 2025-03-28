const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// PDF Generation Endpoint
app.post('/generate-pdf', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.setContent(req.body.content, {
            waitUntil: 'networkidle0'
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { 
                top: '20px', 
                right: '20px', 
                bottom: '20px', 
                left: '20px' 
            }
        });

        await browser.close();
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=certificate.pdf',
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).send('PDF generation failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
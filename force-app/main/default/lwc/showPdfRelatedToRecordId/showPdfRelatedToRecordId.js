import { LightningElement, api, track, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/PDFViewerController.getRelatedFilesByRecordId';

export default class ShowPdfRelatedToRecordId extends LightningElement {
    @api recordId;
    @api heightInRem;
    @track pdfFiles = [];
    @track error;

    @wire(getRelatedFilesByRecordId, { recordId: '$recordId' })
    wiredFieldValue({ error, data }) {
        if (data) {
            console.log(data);
            this.pdfFiles = data;
            this.error = '';
        } else if (error) {
            this.error = error;
            this.pdfFiles = '';
        }
    }

    get tabs() {
        const tabs = [];
        const files = Object.entries(this.pdfFiles);
        for (const [ID, title] of files) {
            tabs.push({
                value: ID,
                label: title
            });
        }        
        return tabs;
    }

    setUrl(e) {
        console.log('clicked on tab', e.target.id);
    }
}
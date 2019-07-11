import { LightningElement, api, track, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/PDFViewerController.getRelatedFilesByRecordId';

export default class ShowPdfRelatedToRecordId extends LightningElement {
    @api recordId;
    @api heightInRem;
    @track pdfFiles = [];
    @track error;
    @track fileID;

    @wire(getRelatedFilesByRecordId, { recordId: '$recordId' })
    wiredFieldValue({ error, data }) {
        if (data) {
            this.pdfFiles = data;
            this.error = '';
            const fileIDs = Object.keys(data);
            this.fileID =  fileIDs.length ? fileIDs[0] : ''; 
        } else if (error) {
            this.error = error;
            this.pdfFiles = ''; 
            this.fileID = ''; 
        }
    }

    get tabs() {
        if (!this.fileID) return [];

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

    setFileID(e) {
        this.fileID = e.target.value;
    }
}
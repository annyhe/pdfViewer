import { LightningElement, api, track, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/PDFViewerController.getRelatedFilesByRecordId';

export default class ShowPdfRelatedToRecordId extends LightningElement {
    @api recordId;
    @track pdfFileIds;
    @track error;

    @wire(getRelatedFilesByRecordId, { recordId: '$recordId' })
    wiredFieldValue({ error, data }) {
        if (data) {
            this.pdfFileIds = data;
            this.error = '';
        } else if (error) {
            this.error = error;
            this.pdfFileIds = '';
        }
    }
}
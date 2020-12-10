import { LightningElement, api, wire } from 'lwc';
import getRelatedPdfFilesByRecordId from '@salesforce/apex/PDFViewerController.getRelatedPdfFilesByRecordId';

export default class ShowPdfRelatedToRecordId extends LightningElement {
    // Current record ID. *recordId* is a reserved identifier
    @api recordId;
    // Declare to pass heightInRem to the child component in markup
    @api heightInRem;

    // Specify which file for child component to render
    fileID;

    pdfFiles = [];

    @wire(getRelatedPdfFilesByRecordId, { recordId: '$recordId' })
    wiredFieldValue({ error, data }) {
        if (data) {
            this.pdfFiles = data;
            this.error = undefined;
            // Save the first related PDF's file ID to fileID
            this.fileID = data.length ? data[0].id : undefined;
        } else if (error) {
            this.error = error;
            this.pdfFiles = undefined;
            this.fileID = undefined;
        }
    }

    // Maps file ID and title to tab value and label
    get tabs() {
        if (!this.fileID) {
            return [];
        }
        return this.pdfFiles.map((file) => ({
            value: file.id,
            label: file.title
        }));
    }

    // event handler for each tab: onclick tab, change fileID
    setFileID(event) {
        this.fileID = event.target.value;
    }
}

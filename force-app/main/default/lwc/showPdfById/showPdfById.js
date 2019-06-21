import { LightningElement, api, track, wire } from 'lwc';
import getFileByID from '@salesforce/apex/PDFViewerController.getFileByID';

export default class ShowPdfById extends LightningElement {
    @api fileId;
    @track url;

    @wire(getFileByID, { fileID: '$fileId' })
    wiredFieldValue({ error }) {
        if (error) {
            this.url = '';
        } else if (this.fileId) {
            this.url = '/sfc/servlet.shepherd/document/download/' + this.fileId;
        }
    } 
}

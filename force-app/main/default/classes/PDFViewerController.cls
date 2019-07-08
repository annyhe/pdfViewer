public with sharing class PDFViewerController {
    @AuraEnabled(cacheable=true)
    public static List<String> getRelatedFilesByRecordId(String recordId) {
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<String> fileIDs = new List<String>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }
        List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, 
            Title FROM ContentVersion WHERE ContentDocumentId IN : fileIDs AND FileExtension='pdf'];
        List<String> pdfFileIDs = new List<String>();
        for (ContentVersion docLink : docs) {
            pdfFileIDs.add(docLink.ContentDocumentId);
        }

        return pdfFileIDs;
    }
}
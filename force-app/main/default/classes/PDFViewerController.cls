public with sharing class PDFViewerController {
    @AuraEnabled(cacheable=true)
    public static List<ID> getRelatedFilesByRecordId(String recordId) {
        // Get record file IDs        
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }

        // Filter PDF files 
        List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension 
            FROM ContentVersion WHERE ContentDocumentId IN : fileIDs AND FileExtension='pdf'];
        List<ID> pdfFileIDs = new List<ID>();
        for (ContentVersion docLink : docs) {
            pdfFileIDs.add(docLink.ContentDocumentId);
        }

        return pdfFileIDs;
    }
}
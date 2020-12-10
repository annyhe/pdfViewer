public with sharing class PDFViewerController {
    @AuraEnabled(cacheable=true)
    public static List<File> getRelatedPdfFilesByRecordId(String recordId) {
        // Get record file IDs
        List<ContentDocumentLink> files = [
            SELECT ContentDocumentId
            FROM ContentDocumentLink
            WHERE LinkedEntityId = :recordId
        ];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }

        // Filter PDF files
        List<ContentVersion> docs = [
            SELECT ContentDocumentId, FileExtension, Title
            FROM ContentVersion
            WHERE ContentDocumentId IN :fileIDs AND FileExtension = 'pdf'
        ];

        List<File> pdfFiles = new List<File>();
        for (ContentVersion docLink : docs) {
            pdfFiles.add(new File(docLink.ContentDocumentId, docLink.Title));
        }
        return pdfFiles;
    }

    public class File {
        @AuraEnabled
        public Id id;
        @AuraEnabled
        public String title;

        public File(Id id, String title) {
            this.id = id;
            this.title = title;
        }
    }
}

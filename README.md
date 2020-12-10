# PDF Viewer Lightning Web Component

These are two Lightning Web Components to add PDF viewing capabilities to your Salesforce page. Configure which PDF file via the Lightning App Builder. Light up your org with PDF for training, enablement, entertainment... The possibilities are endless!

Use the **showPdfById** for Home and App pages.
![PDF Viewer on Home page](doc-gfx/homePage.png)

Use the **showPdfRelatedToRecordId** component for Record pages.
![PDF Viewer on Opportunity Record page](doc-gfx/recordPage.png)

> These components are designed to run on Salesforce Platform. If you want to experience Lightning Web Components on any platform, please visit https://lwc.dev, and try out our Lightning Web Components sample application [LWC Recipes OSS](https://github.com/trailheadapps/lwc-recipes-oss).

## Installing Components using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the pdfViewer repository:

    ```
    git clone https://github.com/annyhe/pdfViewer
    cd pdfViewer
    ```

1. Create a scratch org and provide it with an alias (**pdfViewer** in the command below):

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a pdfViewer
    ```

1. Push the app to your scratch org:

    ```
    sfdx force:source:push
    ```

1. Assign the **PDF_Viewer** permission set to the default user:

    ```
    sfdx force:user:permset:assign -n PDF_Viewer
    ```

1. Open the scratch org:

    ```
    sfdx force:org:open
    ```

1. Go to **Setup → Security → File Upload and Download Security**, find the **.pdf** label, click the **Edit** button, and set the picklist value to **Execute In Browser.**

    This sets the default behavior for opening PDF files. If you don't change this, you might accidentally download the file instead of viewing it.

All set? Let's add the components to the respective pages!

### Directions to add a PDF viewer component to an App or Home page

1. Go to an App or Home page. Click on the **Setup** icon on the top left, then click **Edit Page**.

1. Drag the **showPdfById** component onto the page.

1. In the **Lightning App Builder**, set **youTubeId** field to the desired PDF File's Content Document ID. Where do you find such an ID? Go to **File --> Desired File --> Download**, then get the ID in the browser. The url format should be like this _HOST/sfc/servlet.shepherd/document/download/FILE_ID_

    ![Set the PDF File ID in App Builder](doc-gfx/homePageConfig.png)

1. Optionally you can set the height of the PDF with **Height in rem**. The PDF is not rendered yet. Check there is no error message. Click **Save**, then **Back**.

1. Enjoy your PDF on the App or Home page!

    ![PDF Viewer on Home page](doc-gfx/homePage.png)

### Directions to add a PDF viewer component to a Record page

1. Go to a Record page. Make sure there is at least one File of type PDF related to the Record. If there are no related PDF File(s), the component will show an error message.

1. To add the component to the Record page, click on the **Setup** icon on the top left, then click **Edit Page**.

1. Drag the **showPdfRelatedToRecordId** component onto the page.

    ![Add the PDF Viewer component in Lightning App Builder](doc-gfx/recordPageConfig.png)

1. Optionally you can set the height of the PDF with **Height in rem**. Click **Save**, then **Back**.

1. Enjoy your PDF viewer on the Record page!

    ![PDF Viewer on Opportunity Record page](doc-gfx/recordPage.png)

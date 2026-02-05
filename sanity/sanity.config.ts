import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'AI Co-Pilot Portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton documents
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Playbook')
              .id('playbook')
              .child(
                S.document()
                  .schemaType('playbook')
                  .documentId('playbook')
              ),
            S.listItem()
              .title('Framework Page')
              .id('frameworkPage')
              .child(
                S.document()
                  .schemaType('frameworkPage')
                  .documentId('frameworkPage')
              ),
            S.divider(),
            // Regular document types
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('talk').title('Talks'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

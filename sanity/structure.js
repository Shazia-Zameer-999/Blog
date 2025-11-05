// ./sanity/structure.js
import { StructureBuilder } from 'sanity/structure'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // 👇 Singleton "About" document
      S.listItem()
        .title('About Page')
        .id('about')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about') // Ensures a single About doc
        ),

      // 👇 Automatically include all other document types EXCEPT 'about'
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'about'),
    ])
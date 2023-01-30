import { Document, Page, View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import React from "react";

export default function ResultsReport ({informacion, pastel}) {
   console.log(informacion);
   const rawHeaders = Object.keys(informacion[0]);
   const headers = rawHeaders.map(letter => {
      const capitalized = letter.replace(/^./, letter[0].toUpperCase());
      return capitalized;
   });

   const styles = StyleSheet.create({
      table: { 
         display: "table", 
         borderStyle: "solid", 
         borderWidth: 1, 
         borderRightWidth: 0, 
         borderBottomWidth: 0,
         margin: '0 auto',
      },  
      tableRow: { 
         flexDirection: "row",
         width: '100%'  
      }, 
      tableCol: { 
         width: "20%", 
         borderStyle: "solid", 
         borderWidth: 1, 
         borderLeftWidth: 0, 
         borderTopWidth: 0,
      }, 
      tableCell: { 
         fontSize: 10,
         textAlign: 'center',
         display:'flex',
         padding: '5px',
      },
      bold: {
         fontWeight: 'bold'
      },
      header: {
         textAlign: 'center',
         margin: '12px',
      },
      body:{
         margin: '10px',
      }
   });

   return (
      <Document>
         <Page style={styles.body}>
            <View style={styles.header}>
               <Text>Cooperativa de Ahorro y Crédito Nueva Esperanza</Text>
               <Text>Reporte de elecciones</Text>
            </View>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  {headers.map((header) => (
                     <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, {fontWeight: 'bold'}]}>{header}</Text> 
                     </View>
                  ))}
               </View>
               {informacion.map((row, index) => {
                  return (
                  <View style={styles.tableRow}>
                     {Object.values(row).map(val =>
                        <View style={styles.tableCol}>
                           <Text style={styles.tableCell}>{val}</Text>
                        </View>
                     )}
                  </View>);
               })}
            </View>
         </Page>
         <Page style={styles.body}>
            <Image src={pastel}/>
         </Page>
      </Document>
   );
}
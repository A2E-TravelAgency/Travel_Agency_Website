import VoyageModel from '../Models/Voyages.js';
import express from 'express';
const app = express.Router();



app.post("/insert",async (req,res)=>{


    const villeDep = req.body.villeDep;
    const villeArr = req.body.villeArr;
    const dateDep = req.body.dateDep;
    const dateArr = req.body.dateArr;
    const nbPlace = req.body.nbPlace;
    const price = req.body.price;

    
      const voyage = new VoyageModel({ voyageDepart :villeDep, 
       voyageArrive:villeArr, voyageDateDepart:dateDep,voyageDateArrive:dateArr,
        voyagePrix:price,voyagePlaces:nbPlace});
        try{
          await voyage.save();
        }catch(err){
            console.log(err);
        }//ss
  });




  app.put("/buy",async (req,res)=>{


    // const name = req.body.name;
    // const tel = req.body.tel;
    const id =req.body.id;
    var voyageurs= { name: req.body.name, tel: req.body.tel };
    
        try{
          VoyageModel.findById(id,(bought)=>{
            bought.voyageurs.push(voyageurs);
            bought.voyagePlaces=bought.voyagePlaces-1;
            bought.save();
          });
        }catch(err){
            console.log(err);
        }//ss
  });

  // reservation insert after checkout
  // app.post("/insertreservation",async (req,res)=>{

  //   const name = req.body.name;
  //   const mail = req.body.mail;
  //   const tel = req.body.tel;

  //   const villeDep = req.body.villeDep;
  //   const villeArr = req.body.villeArr;
  //   const dateDep = req.body.dateDep;
  //   const dateArr = req.body.dateArr;
  //   const nbPlace = req.body.nbPlace;
  //   const price = req.body.price;

    
  //     const voyageur = new VoyageurModel({ name:name, mail:mail, tel:tel,  voyageDepart :villeDep, 
  //      voyageArrive:villeArr, voyageDateDepart:dateDep,voyageDateArrive:dateArr,
  //       voyagePrix:price,voyagePlaces:nbPlace});
  //       try{
  //         await voyage.save();
  //       }catch(err){
  //           console.log(err);
  //       }//ss
  // });



  app.get("/read",async (req,res)=>{
    VoyageModel.find({},(err,result)=>{
      if(err){
        res.send(err);
      }

      res.send(result);


    })

  });


  app.post("/readvoyageurs/",async (req,res)=>{
    const Id = req.body.id;
     VoyageModel.find({_id:Id},(err,result)=>{
       if(err){
         res.send(err);
       }
    
       res.send(result);


     })

  });


  app.delete("/delete/:id", async (req,res)=>{
      const id = req.params.id;
      await VoyageModel.findByIdAndRemove(id).exec();
      res.send("Deleted")
    })

    export default app;
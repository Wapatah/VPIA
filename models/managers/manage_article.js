module.exports = function() {

  let Article;

  return {
    
    //----------------Basic CRUD -------------------//
    articleGetAll: function () {
      return new Promise(function (resolve, reject){

      });
    },

    articleGetById: function (){
      return new Promise(function (resolve, reject){

      });
    },

    articleAdd : function (newItem) {
      return new Promise(function (resolve, reject){

      });
    },

    articleEdit: function (newItem){
      return new Promise(function (resolve, reject){

      });
    },

    articleDelete: function(itemId){
      return new Promise(function (resolve, reject){

      });
    },

    //----------------Unique to Article -------------------//
    articleWithHistory: function() {
      return new Promise(function (resolve, reject){

      });
    },

    articleCompare: function(compareItem) {
      return new Promise(function (resolve, reject){

      });
    }

  }
    
};
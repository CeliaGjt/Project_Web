class User{

    static id = this.id;
    static name = this.name;
    static password = this.password;
    static connexion = this.connexion;

    constructor(data){   //id,title,comment,tags
        if(undefined != data.id) {
          if(!isInt(data.id)){
            throw new Error("User Creation : passed Id is not an integer");
          }
          this.id = data.id;
        } else {
          this.id = parseInt(    Math.floor(Math.random() * Math.floor(10000))     );
        }
        if(undefined != data.name) {
          if(!isString(data.name)){
            throw new Error("User Creation : passed Name is not a string");
          }
          this.name = data.name;
        } else {
          this.name = "utilisateur-inconnu";
        }
        if(undefined != data.password) {
            if(!isString(data.password)){
              throw new Error("User Creation : passed password is not a pssword");
            }
            this.password = data.password;
        } else {
            this.password = "password";
        }
    }

    static isUser(anObject){
        // check if mandatory fields are there
        let hasMandatoryProperties = Object.keys(this).every(key=> anObject.hasOwnProperty(key));
        // we should also check the property values (if are strings, etc ... as in constructor) 
        return hasMandatoryProperties;
      }
    
      static isValidProperty(propertyName,propertyValue) {
        if(!this.hasOwnProperty(propertyName)){
          return false;
        }
        // we should also check the property values (if are strings, etc ... as in constructor) 
        return true;
      }


}

function isInt(value) {
    let x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}
  
function isString(myVar) {
    return (typeof myVar === 'string' || myVar instanceof String) ;
}

export{User}
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const addPerItemChargeSchema = new mongoose.Schema({
  chargeName: {type: String},
  chargeCount: {type: Number}
})


const addChargeSchema = new mongoose.Schema({
  chargeName: {type: String},
  chargeCount: {type: Number}
})

const itemSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  quantity: {type: Number},
  taxName: {type: Number},
  tax: {type: Number},
  additionalCharge: {type: [addPerItemChargeSchema]}
}) 

const invoiceSchema = new mongoose.Schema( {

  invoiceName: {type: String, default: 'Invoice', required: true},
  invoiceSummary: {type: String},
  invoiceNumber: {type: Number},
  invoiceDate: {type: Date, required: true},
  paymentdue: {type: Date},

  itemsName: {type: String, default: 'ITEMS'},
  unitPriceName: {type: String, default: 'UNIT PRICE'},
  quantityName: {type: String, default: 'QUANTITY'},
  totalName: {type: String, default: 'TOTAL'},

  currency: {type: String},

  invoiceTotal: {type: Number, required: true},
  addCharge: {type: [addChargeSchema]}, 
  taxName: {type: Number},
  tax: {type: Number},

  items: {type: [itemSchema]},  

  notes: {type: String},
  footer: {type: String},

  companyName: {type: String, required: true},
  companyAddressL1: {type: String},
  companyAddressL2: {type: String},
  companyCity: {type: String},
  companyZip: {type: Number},
  companyCountry: {type: String},
  companyProvince: {type: String},
  companyPhone: {type: String},
  companyWebsite: {type: String},
  companyFax: {type: String},
  companyAccount: {type: String},
  companyBankName: {type: String},
  companyBankAddress: {type: String},
  companySWIFT: {type: String},  

  customerName: {type: String, required: true},
  customerAddressL1: {type: String},
  customerAddressL2: {type: String},
  customerCity: {type: String},
  customerZip: {type: Number},
  customerCountry: {type: String},
  customerProvince: {type: String},
  customerPhone: {type: String},
  customerEmail: {type: String},
  customerContactFirstName: {type: String},
  customerContactLastName: {type: String},
  customerWebsite: {type: String},
  customerFax: {type: String},
  customerAccountNumber: {type:String}
  
}) 



invoiceSchema.plugin(autoIncrement.plugin, 'Invoice');

const Invoice = mongoose.connection.model('Invoice', invoiceSchema);


module.exports = Invoice

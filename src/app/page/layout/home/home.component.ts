import { UploadImageService } from './../../../../shared/save/upload-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalManager } from 'ngb-modal';
import * as _ from 'lodash';
import { UploadImage } from 'src/app/modal/UploadImage';
import * as firebase from 'firebase';
import { UtilService } from 'src/shared/util/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;
  currentUpload: UploadImage;
  productTypeList: Array<any>;
  image: any;
  saleDateStr: string = '';
  shippingDateStr: string = '';
  selectedFile: FileList = null;
  allData: Array<any>;
  pageNum = 1;
  product: Product;
  saleDate: Date;
  shippingDate: Date;
  isInsert: boolean = false;
  allProduct: Array<any>;
  lastKey: string = '';
  filter = {
    productType: '',
    status: ''
  }
  err = {
    productImageName: false,
    productType: false,
    productId: false,
    productName: false,
    productPrice: false,
    customerName: false,
    customerAddress: false,
    customerPhoneNumber: false,
    customerRef: false,
    saleDate: false,
    trackingNumber: false,
    shippingType: false,
    shippingDate: false,
    appointmentPoint: false,
    isErr: false,
    remark: false
  }
  productList: Array<any>;
  constructor(private db: AngularFireDatabase,
    private uploadimgService: UploadImageService,
    private util: UtilService,
    private modalService: ModalManager) {
    this.productList = [];
    this.productTypeList = [];
    this.allData = [];
    this.image = '../../../../assets/images/logo-b.png'
    this.product = new Product();
    // this.db.list('/Product').valueChanges().subscribe(product => {

    //   this.productList = product;

    //   console.log(product);
    // })
    this.util.ShowLoading();
    this.GetProductType();
    this.allProduct = [];

    this.filter.status = 'all'



    console.log('productTypeList=>', this.productTypeList);
    console.log('productList=>', this.productList);
    console.log('alldata=>', this.allData);
  }

  GetProductType() {
    this.db.list('/ProductType').snapshotChanges().forEach(productType => {
      console.log(productType)
      productType.forEach(productTypeItem => {
        console.log(productTypeItem);
        console.log(productTypeItem.payload.toJSON());
        let type = productTypeItem.payload.toJSON();
        let data = {
          id: productTypeItem.key,
          name: type
        }
        this.productTypeList.push(data);

      })
      console.log(this.productTypeList);

    })
    this.db.list(`/Product`).snapshotChanges().forEach(products => {
      this.productList = [];
      console.log('product firebase=>', products);
      products.forEach(product => {
        console.log(product.payload.toJSON());
        let productitem = Object.keys(product.payload.toJSON()).map(key => ({ key: key, data: product.payload.toJSON()[key] }));
        console.log(productitem)
        // let data: any = {};

        if (this.productList.length > 0) {
          productitem.forEach(productdata => {
            this.productList.push(productdata);
          })
        } else {
          this.productList = productitem;
        }
      })
      console.log('productList=>', this.productList);
      this.util.HideLoading();
      this.allData = _(this.productList).groupBy('data.productType').map((objs, keys) => ({
        'type': keys,
        'data': objs
      })).value();
      this.filter.productType = this.productTypeList[0].id;
      for (let item of this.allData) {
        if (item.type == this.filter.productType) {
          this.productList = item.data;
        }
      }
      this.lastKey = this.productList[this.productList.length - 1].data.productId;
      for (let item of this.allData) {
        this.allProduct = _.concat(this.allProduct, item.data)
      }
      console.log('allProduct=>', this.allProduct);
      console.log('productList=>', this.productList);
      console.log('alldata=>', this.allData);
    });
  }
  FilterProductType() {
    console.log(this.filter.productType);
    let isSetProductList = false;
    for (let item of this.allData) {
      if (item.type == this.filter.productType) {
        this.productList = item.data;
        isSetProductList = true;
      }
    }
    if (!isSetProductList) {
      this.productList = [];
    }

  }

  filterOnKeyUpSearch(itemType, value) {
    return itemType.filter((item) => {
      return item.data.productId.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  filterStatusChange(itemType, value) {
    if (value == 'soleout') {
      return itemType.filter((item) => {
        return item.data.isCustomer == true && item.data.isPaid == true;
      });
    }
    if (value == 'customer') {
      return itemType.filter((item) => {
        return item.data.isCustomer == true && item.data.isPaid == false;
      });
    }

    if (value == 'noCustomer') {
      return itemType.filter((item) => {
        return item.data.isCustomer == false;
      });
    }

  }
  FilterStatus() {
    console.log(this.filter.status)
    if (this.filter.status == 'all') {
      this.FilterProductType();
    } else {
      this.productList = this.filterStatusChange(this.allProduct, this.filter.status);
    }

  }
  SearchItem(value) {
    console.log(value)

    console.log()
    this.productList = this.filterOnKeyUpSearch(this.allProduct, value);
  }
  shippingDateEvent(type, value) {
    this.shippingDate = value;
    console.log(value)
    console.log(type)
    console.log(this.saleDate)
    if (type == 'input') {
      let isoDate = this.shippingDate.toISOString();
      this.shippingDateStr = this.ConvertISODate(isoDate);

    } else {
      if (value == null) {
        this.util.MessageError();
      } else {
        let isoDate = this.shippingDate.toISOString();
        this.shippingDateStr = this.ConvertISODate(isoDate);
      }
    }
    if (this.shippingDateStr != '') {
      this.err.shippingDate = false;
    }
    this.product.shippingDate = this.shippingDateStr;
  }
  addEvent(type, value) {
    this.saleDate = value;
    console.log(value)
    console.log(type)
    console.log(this.saleDate)
    if (type == 'input') {
      let isoDate = this.saleDate.toISOString();
      this.saleDateStr = this.ConvertISODate(isoDate);

    } else {
      if (value == null) {
        this.util.MessageError();
      } else {
        let isoDate = this.saleDate.toISOString();
        this.saleDateStr = this.ConvertISODate(isoDate);
      }
    }
    if (this.saleDateStr != '') {
      this.err.saleDate = false;
    }
    this.product.saleDate = this.saleDateStr;
  }


  ConvertISODate(date) {
    return moment(date, 'YYYY-MM-DDTHH:mm:ssTZD').add(543, 'year').format('YYYY-MM-DD HH:mm:ss');
  }

  HaveCustomer(value) {
    // console.log(value);
    // console.log(this.product.isCustomer)
  }
  NewProduct() {

    this.isInsert = true;
    this.product = new Product();
    this.product.customerRef = 'กรุณาเลือก'
    this.product.productType = this.productTypeList[0].id;
    this.product.productId = this.lastKey.substring(0, 2) + (Number.parseInt(this.lastKey.substring(2)) + 1).toString().trim();
    this.product.shippingType = '0';
    this.SetData();
    this.openModal();
  }
  EditProduct(item) {
    this.isInsert = false;
    this.product = new Product();
    this.SetData();
    this.product = item.data;
    this.product.key = item.key;
    this.image = item.data.productImageUrl;
    this.saleDate = new Date(item.data.saleDate);
    this.openModal();

  }

  SetData() {
    this.saleDate = null;
    this.saleDateStr = '';
    this.image = '../../../../assets/images/logo-b.png';
    this.selectedFile = null;
    this.product.customerRef = 'กรุณาเลือก'
    this.product.productType = this.productTypeList[0].id;
    Object.entries(this.err).forEach(([key, value]) => {
      this.err[key] = false;
    })
    console.log(this.err);
  }

  Delete(item) {
    let dialog = this.util.AlertMessageWaitClose('คุณแน่ใจที่จะลบข้อมูลนี้หรือไม่', 'ชื่อสินค้า ' + item.data.productName, {});
    dialog.afterClosed().subscribe((result) => {
      if (result == 'OK') {
        firebase.database().ref().child('/Product/' + item.data.productType + '/' + item.key + '/').remove();
        this.productList = [];
      }
    })
  }
  uploadFile(event) {
    this.selectedFile = event.target.files;
    this.util.ShowLoading();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.image = (<FileReader>event.target).result;
        // console.log(this.image
        this.util.HideLoading();
      }

      reader.readAsDataURL(event.target.files[0]);
    }

    if (this.selectedFile.length == 0) {
      this.util.HideLoading();
    }
    console.log(this.selectedFile)
  }
  SelectType(value) {
    console.log(value);
    console.log(this.allData);
    for (let item of this.allData) {
      if (item.type == value) {
        this.lastKey = item.data[item.data.length - 1].data.productId;
        this.product.productId = this.lastKey.substring(0, 2) + (Number.parseInt(this.lastKey.substring(2)) + 1).toString().trim();
      }
    }
  }
  SelectShippingType(value) {
    console.log(value);
    console.log(this.product.shippingType)
  }
  CloseModal() {
    this.modalService.close(this.modalRef);
  }

  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
      size: "lg",
      modalClass: 'modal-product',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    })
  }

  ngOnInit() {

  }
  SetErr() {
    this.err.isErr = true;
    return true
  }
  onSubmit() {
    console.log(this.product);
    this.err.isErr = false;
    if (this.product.productId == '') {
      this.err.productId = this.SetErr();
    }
    if (this.isInsert) {
      if (this.selectedFile == null) {
        this.err.productImageName = this.SetErr();
      }
    } else {
      if (this.product.productImageUrl == '' && this.product.productImageName == '') {
        this.err.productImageName = this.SetErr();

      }
    }

    if (this.product.productName == '') {
      this.err.productName = this.SetErr();
    }
    if (this.product.productPrice == '') {
      this.err.productPrice = this.SetErr();
    }
    if (this.product.isCustomer) {
      if (this.product.customerName == '') {
        this.err.customerName = this.SetErr();
      }

      if (this.product.customerRef == 'กรุณาเลือก') {
        this.err.customerRef = this.SetErr();
      }
      console.log(this.saleDate);
      if (this.isInsert) {
        if (this.saleDateStr == '') {
          this.err.saleDate = this.SetErr();
        }
      } else {
        if (this.product.saleDate == '') {
          this.err.saleDate = this.SetErr();
        }
      }

    }
    if (this.product.isCustomer) {
      if (this.product.isPaid) {
        if (this.product.shippingType == 'shipp01') {
          if (this.product.appointmentPoint == '') {
            this.err.appointmentPoint = this.SetErr();
          }
        }
        if (this.product.shippingDate == 'shipp02') {
          if (this.product.customerAddress == '') {
            this.err.customerAddress = this.SetErr();
          }

          if (this.product.customerPhoneNumber == '') {
            this.err.customerPhoneNumber = this.SetErr();
          }
        }
        if (this.product.isShipping && this.product.shippingType == 'shipp02') {
          if (this.product.trackingNumber == '') {
            this.err.trackingNumber = this.SetErr();
          }


          if (this.product.shippingDate == '') {
            this.err.shippingDate = this.SetErr();
          }
        }
      }else{
        
      }
    }else{
      this.product.isPaid = false;
      this.product.customerName = '';
      this.product.customerAddress = ''
      this.product.customerRef = 'กรุณาเลือก';
      this.product.saleDate = '';
      this.product.shippingType = '0';
      this.product.appointmentPoint = '';
      this.product.isShipping = false;

    }

    if (!this.isInsert) {
      if (this.product.key == '') {
        this.err.isErr = true;
      }
    }

    console.log(this.err);
    if (!this.err.isErr) {
      this.util.ShowLoading();


      if (!this.isInsert) {
        if (this.selectedFile == null) {
          this.db.object(`Product/${this.product.productType}/${this.product.key}`).update(this.product);
          this.CloseModal();
          this.util.HideLoading();
        } else {
          this.UploadAndSaveData();
        }
      } else {
        this.product.saleDate = this.saleDateStr;
        this.UploadAndSaveData();
      }

    }

  }
  UploadAndSaveData() {
    let file = this.selectedFile.item(0);
    this.currentUpload = new UploadImage(file);
    console.log(this.currentUpload.$key);
    let uploadTask = this.uploadimgService.pushUploadImage(this.currentUpload);
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      uploadSnapshot.ref.getDownloadURL().then((downloadUrl) => {
        // console.log(downloadUrl);
        this.product.productImageUrl = downloadUrl;
        this.product.productImageName = file.name;
        if (this.isInsert) {
          this.db.list(`Product/${this.product.productType}`).push(this.product);

        } else {
          this.db.object(`Product/${this.product.productType}/${this.product.key}`).update(this.product);

        }
        this.util.HideLoading();
        this.CloseModal();

      })
    })

    console.log(this.currentUpload);
  }
}
export class ProductItem {
  id: string = '';
  name: string = '';
}
export class Product {
  key: string = '';
  productId: string = '';
  productType: string = '';
  productTypeName: string = '';
  productName: string = '';
  productPrice: string = '';
  productImageName: string = '';
  productImageUrl: string = '';
  isCustomer: boolean = false;
  isPaid: boolean = false;
  shippingType: string = '';
  isShipping: boolean = false;
  appointmentPoint: string = '';
  customerName: string = '';
  customerAddress: string = '';
  customerPhoneNumber: string = '';
  customerRef: string = '';
  saleDate: string = '';
  trackingNumber: string = '';
  remark: string = '';
  shippingDate: string = '';
}
export class ProductTypeItem {
  id: string = '';
  name: string = '';
}


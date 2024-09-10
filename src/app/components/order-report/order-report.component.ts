import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  public REST_API_SERVER: string = `${environment.REST_API_URL}/api/${environment.version}`;

  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  timelineFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'thisYear', label: 'This year' },
    { value: 'lastYear', label: 'Last year' },
    { value: 'custom', label: 'Custom date' },
  ];
  selectedTimelineFilter: string = 'all';
  startDate: Date;
  endDate: Date;

  orderStatusFilterOptions: any[] = [
    { value: -1, label: 'All' },
    { value: 0, label: 'Order Placed' },
    { value: 1, label: 'Order Completed' },
    { value: 2, label: 'Order Cancelled' },
  ];
  orderStatusSelectedFilter: string = ''; // The selected value from the dropdown
  constructor(private http: HttpClient ,
    private authenticationService: AuthenticationService) 
   {} // Inject HttpClient

  ngOnInit(): void {
    this.orderStatusSelectedFilter = this.orderStatusFilterOptions[0].value;
    const storeId = this.authenticationService.getStoreId();
    const that = this;
    let resp: any = {}; // Initialize resp with an empty object or provide a proper type
    this.dtOptions = {
      serverSide: true,

      // Set the flag

      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.REST_API_SERVER + '/order-report-json',
            {
              ...dataTablesParameters,
              order_status: this.orderStatusSelectedFilter,
              timeline: this.selectedTimelineFilter,
              start_date: this.startDate,
              end_date: this.endDate,
              store_id: storeId,
            },
            // dataTablesParameters,
            {}
          )
          .subscribe((response) => {
            resp = response || {}; // Assign the response to resp, ensuring it's not null or undefined

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: [
        
        {
          title: 'ORDER ID',
          data: 'order_id',
          orderable: false,
          render: function (data:any, type:any, row:any, meta:any) {
             
              let orderNumber = row.order_number;
             
              return `<a href="./order-view/${data}">${orderNumber}</a>`;
          }
      },
        {
          title: 'CUSTOMER NAME',
          data: 'customer_name',
          orderable: false,
        },
        {
          title: 'PHONE',
          data: 'customer_phone',
          orderable: false,
        },
        {
          title: 'TOT. QTY',
          data: 'total_quantities',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.table_order_status == 2)
              return '0';
            else
              return row.total_quantities;
          },
        },
        {
          title: 'AMOUNT',
          data: 'order_amount',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.table_order_status == 2)
              return '0.00';
            else
              return row.order_amount;
          },
        },
        {
          title: 'PAID AMOUNT',
          data: 'total_paid_amount',
          orderable: false,
          render: function (data, type, row, meta) {
            if (row.total_paid_amount === null) {
              return '0.00';
            } else {
              return row.total_paid_amount;
            }
          },
        },
        {
          title: 'DISCOUNT',
          data: 'order_discount',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.table_order_status == 2)
              return '0.00';
            else
              return row.order_discount;
          },
        },
        {
          title: 'BALANCE',
          data: null,
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (row.table_order_status == 2)
              return '0.00';
            else {
            let balance =
              row.order_amount - row.total_paid_amount;
            if (balance < 0) balance = 0;
            return balance.toFixed(2);
            }
          },
        },
        {
          title: 'STATUS',
          data: 'table_order_status',
          render: function (data: any, type: any, row: any, meta: any) {
            switch (data) {
              case 0:
                return '<span class="btn btn-info  btn-block">Placed</span>';
              case 1:
                return '<span class="btn btn-success btn-block">Completed</span>';
              case 2:
                return '<span class="btn btn-danger btn-block">Cancelled</span>';
              default:
                return 'Unknown';
            }
          },
          orderable: false,
        },
        {
          title: 'ORDER PLACED',
          data: 'order_created',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            // Assuming data is in the format '2023-11-15 06:34:59'
            const dateObject = new Date(data);
            const formattedDate = dateObject.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true, // Use 12-hour format
            });
            return formattedDate;
          },
        },
        {
          title: 'PRODUCTS ARTICLES',
          data: 'products_article_count',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {

          let str = data;
          if (str.trim() === "")
            return '';

          const items = str.split(',');
          const itemCounts = items.reduce((count, item) => {
            const itemName = item.trim();
            count[itemName] = (count[itemName] || 0) + 1;
            return count;
          }, {});
          const resultString = Object.entries(itemCounts)
            .map(([item, count]) => `${item} - ${count}`)
            .join(', ');

          return resultString;

          },
        },
        {
          title: 'DELIVERY DATE',
          data: 'delivery_date',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            const dateObject = new Date(data);
            const formattedDate = dateObject.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            });
            return formattedDate;
          },
        },
        {
          title: 'TRAIL DATE',
          data: 'trail_date',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            const dateObject = new Date(data);
            const formattedDate = dateObject.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            });
            return formattedDate;
          },
        },
        {
          title: 'PAYMENT METHODS',
          data: 'payment_methods',
          orderable: false,
        },
        {
          title: 'INVOICE NO',
          data: 'invoice_number',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (data) {
              var invoiceId = '' + data;
              return `<a href="./order-view/${row.order_id}">${invoiceId}</a>`;
            } else {
              return '--';
            }
          },
        },
        {
          title: 'INVOICE DATE',
          data: 'invoice_date',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (!data) return '--';

            const dateObject = new Date(data);
            const formattedDate = dateObject.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            });
            return formattedDate;
          },
        },
        {
          title: 'REMARKS',
          data: 'remarks',
          orderable: false,
        },
        {
          title: 'F.CLOSED REMARKS',
          data: 'force_completed_reason',
          orderable: false,
        },
      ],
      order: [],
      dom: 'Blfrtip',
      lengthMenu: [
        [50, 100, 250, 500, -1],
        ['50', '100', '250', '500', 'All'],
      ],
      buttons: ['colvis', 'excel'],
      footerCallback: (tfoot, data, start, end, display) => {
        this.dtElement.dtInstance.then((api: DataTables.Api) => {
          // let totalQty = api
          //   .column(3)
          //   .data()
          //   .reduce((a, b) => Number(a) + Number(b), 0);

          let totalQty = data.reduce((a, row) => {
            if (row.table_order_status !== 2) {
              a += Number(row.total_quantities);
            }
            return a;
          }, 0);

          let totalAmount = data.reduce((a, row) => {
            if (row.table_order_status !== 2) {
              a += Number(row.order_amount);
            }
            return a;
          }, 0);

          let totalPaid = api
            .column(5)
            .data()
            .reduce((a, b) => Number(a) + Number(b), 0);

          let totalDisc = api.column(6).data().reduce((a, b, index) => {
            if (data[index].table_order_status !== 2) {
              a += Number(b);
            }
            return a;
          }, 0);

          let totalBalance = data.reduce((total, row) => {
            if (row.table_order_status !== 2) {
              let balance = row.order_amount - row.total_paid_amount - row.order_discount;
              if (balance < 0) balance = 0;
              total += Number(balance);
            }
            return total;
          }, 0);

          $('#dataTable tfoot th').eq(1).html('Total: ');
          $('#dataTable tfoot th').eq(3).html(totalQty);
          $('#dataTable tfoot th').eq(4).html(totalAmount.toFixed(2));
          $('#dataTable tfoot th').eq(5).html(totalPaid.toFixed(2));
          $('#dataTable tfoot th').eq(6).html(totalDisc.toFixed(2));
          $('#dataTable tfoot th').eq(7).html(totalBalance.toFixed(2));
        });
      },
    };
  }

  countProductItems(str:any) {

    if (str.trim() === "")
      return '';

    const items = str.split(',');
    const itemCounts = items.reduce((count, item) => {
      const itemName = item.trim();
      count[itemName] = (count[itemName] || 0) + 1;
      return count;
    }, {});
    const resultString = Object.entries(itemCounts)
      .map(([item, count]) => `${item} - ${count}`)
      .join(', ');

    return resultString;
  }

  onOrderStatusFilterChange() {
    $('#dataTable').DataTable().ajax.reload();
  }

  onDateChange() {
    $('#dataTable').DataTable().ajax.reload();
  }

  onTimelineFilterChange() {
    if (this.selectedTimelineFilter === 'custom') {
      this.startDate = null;
      this.endDate = null;
    } else {
      $('#dataTable').DataTable().ajax.reload();
    }
  }
}

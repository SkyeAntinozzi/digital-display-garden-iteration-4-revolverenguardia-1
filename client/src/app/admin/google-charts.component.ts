import {Component, OnInit} from '@angular/core';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {AdminService} from "./admin.service";
import {Observable} from "rxjs";

@Component({
    templateUrl: 'google-charts.component.html'
})

// Component class
export class GraphComponent implements OnInit {


    constructor(private adminService: AdminService) {
    }
    value : number = 3;
    dataTable : any[][];
    mapData : string[];


    ngOnInit(): void {
        this.updateTimeVViewCountBar();
        this.updateTimeVViewCountLine();
        this.updateBedMetadataMap();
    }

    /*updateGraph(): void{
        this.adminService.getViewsPerHour()
            .subscribe(result => { this.columnChartOptions["dataTable"] = result;
                console.log(result)}, err => console.log(err));
    }*/

    public line_ChartData = {
        chartType: `LineChart`,
        dataTable: [['Hour', 'Views'],
            ['0',  0],
            ['1',  0],
            ['2',  0],
            ['3',  0],
            ['4',  0],
            ['5',  0],
            ['6',  0],
            ['7',  0],
            ['8',  0],
            ['9',  0],
            ['10',  0],
            ['11',  0],
            ['12',  0],
            ['13',  0],
            ['14',  0],
            ['15',  0],
            ['16',  0],
            ['17',  0],
            ['18',  0],
            ['19',  0],
            ['20',  0],
            ['21',  0],
            ['22',  0],
            ['23',  0],
        ],
        options: {'title': 'Time vs. View Counts', hAxis : {'title' :'Time (in Hours)'}, vAxis : {'title' :'View Counts'}},
    };


    public columnChartOptions = {
        chartType: `ColumnChart`,
        dataTable: [['Hour', 'Views'],
            ['0',  0], ['1',  0], ['2',  0], ['3',  0], ['4',  0], ['5',  0], ['6',  0], ['7',  0], ['8',  0], ['9',  0], ['10',  0], ['11',  0], ['12',  0],
            ['13',  0], ['14',  0], ['15',  0], ['16',  0], ['17',  0], ['18',  0], ['19',  0], ['20',  0], ['21',  0], ['22',  0], ['23',  0],
            ],
        options: {'title': 'Time vs. View Counts', hAxis : {'title' :'Time (in Hours)'}, vAxis : {'title' :'View Counts'}},
    }

    public bedLocations = [[45.593823, -95.875248],
        [45.593831, -95.875525],
        [45.593113, -95.877688],
        [45.593008, -95.876990],
        [45.593512, -95.876351],
        [45.593284, -95.877349],
        [45.593689, -95.874984],
        [45.593712, -95.875958],
        [45.593826, -95.875539],
        [45.593560, -95.875597],
        [45.593592, -95.875406],
        [45.593357, -95.875850],
        [45.593461, -95.875177]];


    public mapOptions = {
        chartType: `Map`,
        dataTable: [['Lat', 'Long', 'Views'],
            [this.bedLocations[0][0], this.bedLocations[0][1], 'TEST'],
            [this.bedLocations[1][0], this.bedLocations[1][1], 'TEST'],
            [this.bedLocations[2][0], this.bedLocations[2][1], 'TEST'],
            [this.bedLocations[3][0], this.bedLocations[3][1], 'TEST'],
            [this.bedLocations[4][0], this.bedLocations[4][1], 'TEST']
        ],
        options: {'zoomLevel' : '18', title : false, showInfoWindow: true}
    }

    public bubbleChartOption = {
        chartType: `BubbleChart`,
        dataTable: [['Bed: ', 'X',    'Y', 'Likes (Colour)', 'Views (Size)'],
                    ['10',    36,      33,                7,             35],
                    ['11',    37,      25,               28,             33],
                    ['13',    49,      16,               18,             50],
                    ['1N',    54,      56,                6,             25],
                    ['1S',    61,      24,               33,             80],
                    ['2N',    61,      40,               24,             90],
                    ['2S',    19,      14,               40,            100],
                    ['5' ,    30,       4,               19,             31],
                    ['6' ,    34,      10,               27,            100],
                    ['7' ,    42,    25.5,               35,             42],
                    ['9' ,    46.5,    29,                9,              5],
                    ['LG',    46.1,  45.3,               39,             39]
        ],
        options: {
            backgroundColor: 'none',
            width: 1140,
            height: 400,
            chartArea: {
                left: 0,
                top: 0,
                width: '100%',
                height: '100%'
            },
            hAxis: {
                gridlines: {count: 0},
                minValue: 0,
                maxValue: 100,
                viewWindow: {min: 0, max: 100}},
            vAxis: {
                gridlines: {count: 0},
                minValue: 0,
                maxValue: 100,
                viewWindow: {min: 0, max: 100}},
            colorAxis: {colors: ['blue', 'purple']},
            bubble: {
                textStyle: {
                    fontSize: 12,
                    color: `white`,
                },
            },
        }
    }

    protected updateTimeVViewCountBar()
    {
        console.log("UPDATING!>");
        this.adminService.getViewsPerHour()
            .subscribe(result => { this.columnChartOptions["dataTable"] = result;
                console.log(result)}, err => console.log(err));


    }
    protected updateTimeVViewCountLine()
    {
        this.adminService.getViewsPerHour()
            .subscribe(result => { this.line_ChartData["dataTable"] = result;
                console.log(result)}, err => console.log(err));
    }

    protected updateBedMetadataMap()
    {
        this.adminService.getBedMetadataForMap()
            .subscribe(result => {
                this.mapData = this.processMapData(result);
                this.mapOptions.dataTable = this.createDataTable(this.mapData);
            }, err => console.log(err));
    }

    private processMapData(mapData : any[]) : string[]
    {
        var buffer : Array<string> = new Array<string>(mapData.length);

        for(var i : number = 0; i < mapData.length; i++)
        {
            buffer[i] =  '<h2>Bed ' + mapData[i]["gardenLocation"] + '</h2>';
            buffer[i] += '<div><strong>Likes:</strong> ' + mapData[i]["likes"]       + '<br/>';
            buffer[i] += '<div><strong>Dislikes:</strong> ' + mapData[i]["dislikes"] + '<br/>';
            buffer[i] += '<div><strong>Comments:</strong> ' + mapData[i]["comments"] + '<br/>';
            buffer[i] += '</div>';
        }

        return buffer;
    }

    private createDataTable(toolWindow: string[]) : any[][]
    {
        var dataTable : any[][] = new Array<Array<any>>(toolWindow.length+1);

        for(var i : number = 0; i < toolWindow.length+1; i++)
        {
            dataTable[i] = new Array<any>(3);
        }

        dataTable[0][0] = 'Lat';
        dataTable[0][1] = 'Long';
        dataTable[0][2] = 'ToolWindow';
        for(var i : number = 0; i < toolWindow.length; i++)
        {


            dataTable[i+1][0] = this.bedLocations[i][0];
            dataTable[i+1][1] = this.bedLocations[i][1];
            dataTable[i+1][2] = toolWindow[i];
            console.log(toolWindow[i]);
        }

        return dataTable;
    }

}
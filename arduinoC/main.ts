
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace GestureTouchSensore {
    //% block="GestureTouchSensore init [SSR] pin RX[RX] TX[TX]" blockType="command"
    //% SSR.shadow="dropdown" SSR.options="SSR"
    //% RX.shadow="dropdown" RX.options="RX"
    //% TX.shadow="dropdown" TX.options="TX"
    export function GestureTouchSensoreInitSSR(parameter: any, block: any) {
        let ssr = parameter.SSR.code;
        let rx = parameter.RX.code;
        let tx = parameter.TX.code;

        Generator.addInclude("GestureTouchSensoreInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");
        Generator.addInclude("GestureTouchSensoreInitIncludeSoftwareSerial", "#include <SoftwareSerial.h>");
        Generator.addObject(`GestureTouchSensoreInitObjectSoftwareSerial${ssr}`, "SoftwareSerial", `${ssr}(${rx}, ${tx});`);
        Generator.addObject(`GestureTouchSensoreInitObjectDFRobot_Gesture_Touc${ssr}`, "DFRobot_Gesture_Touch", `DFGT(&${ssr});`);
        Generator.addObject("GestureTouchSensoreInitObjectDFRobot_Gesture_Touc_rslt", "int8_t", `GestureTouchSensorRead_rslt=0;`);


        Generator.addSetup(`GestureTouchSensoreInitSetupmySerial${ssr}`, `${ssr}.begin(9600);`);
        Generator.addSetup("GestureTouchSensoreInitSetupDFGT", "DFGT.setGestureDistance(20);");

    }

    //% board="esp32","arduino"
    //% block="GestureTouchSensore init [SR] pin RX [SRX] TX [STX]" blockType="command"
    //% SR.shadow="dropdown" SR.options="SR"
    //% SRX.shadow="dropdown" SRX.options="SRX"
    //% STX.shadow="dropdown" STX.options="STX"
    export function GestureTouchSensoreInitSR(parameter: any, block: any) {
        let sr = parameter.SR.code;
        let srx = parameter.SRX.code;
        let stx = parameter.STX.code;
    
    
        Generator.addInclude("GestureTouchSensoreInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");

        Generator.addObject("GestureTouchSensoreInitObjectDFRobot_Gesture_Touch", "DFRobot_Gesture_Touch", `DFGT(&${sr});`);
        Generator.addObject("GestureTouchSensoreInitObjectDFRobot_Gesture_Touch_rslt", "int8_t", `GestureTouchSensorRead_rslt=0;`);

        if(Generator.board=="arduino"){
            Generator.addSetup(`GestureTouchSensoreInitSetupmySerial${sr}`,`${sr}.begin(9600);`);
        }else if(Generator.board=="esp32"){
            Generator.addSetup(`GestureTouchSensoreInitSetupmySerial${sr}`,`${sr}.begin(9600,${srx},${stx});`);
        }
        Generator.addSetup("GestureTouchSensoreInitSetupDFGT", "DFGT.setGestureDistance(20);");
    
        }
    

       //% block="GestureTouchSensore read" blockType="command"
       export function GestureTouchSensoreRead(parameter: any, block: any) {
           Generator.addCode("GestureTouchSensorRead_rslt=DFGT.getAnEvent();");
       }

     //% block="GestureTouchSensore [RSLT]" blockType="boolean"
     //% RSLT.shadow="dropdown" RSLT.options="RSLT"
     export function GestureTouchSensoreRSLT(parameter: any, block: any) {
         let rslt=parameter.RSLT.code;
         Generator.addCode([`GestureTouchSensorRead_rslt == ${rslt}`,Generator.ORDER_UNARY_POSTFIX]);
     }
     //% block="GestureTouchSensore set distand [DST]" blockType="command"
     //% DST.shadow="number" DST.defl="10"
     export function GestureTouchSensoreSetDist(parameter: any, block: any) {
         let dis=parameter.DST.code;
         Generator.addSetup("GestureTouchSensoreInitSetupDFGT",`DFGT.setGestureDistance(${dis});`,true);
     }
}

import './wsDispatcher.css';

import { useState } from 'react';

import { TextArea, Button } from '@markforged/bedrock'

const wsMsg1 = {
  "version": "2024-06-25-17:52:27-5663958aec8b26e1c4e4c48ed509c9ff67f2aa52",
  "sender": "e3364f80-abf6-11e5-836e-b10f10c3a498",
  "sender_type": 0,
  "printer": {
      "connected": true,
      "_id": "e3364f80-abf6-11e5-836e-b10f10c3a498",
      "temperature": {
          "0": {
              "a": 30,
              "s": 0
          },
          "1": {
              "a": 30,
              "s": 0
          },
          "2": {
              "a": 0,
              "s": 0
          }
      },
      "case_temp": 0,
      "printer_rev": 1,
      "kit_type": 2,
      "loaded_plastic_material": 501,
      "loaded_fiber_material": 501,
      "cc_plastic_left": 800,
      "cc_fiber_left": 800,
      "state": 1,
      "printing_state": 0,
      "progress": 0,
      "camera": false,
      "cloud_manifest": "prod-manifest.json",
      "feature_role": "default",
      "feature_flags": {
          "locale_role": "public",
          "materials_ONYX_ESD": true,
          "materials_ONYX_FR_A": true,
          "materials_PLA": true,
          "materials_TPU_desktop": true,
          "materials_TPU": true,
          "materials_INCONEL_625": true,
          "materials_TS_D2": true,
          "materials_CU": true,
          "materials_SS_174_FLEX": true,
          "materials_CARBON_FR": true,
          "materials_H13_FLEX": true,
          "materials_D2_FLEX": true,
          "materials_RD_PLASTIC": false,
          "materials_SS_316L": false,
          "materials_TI64": false,
          "materials_RD_METAL": false,
          "materials_CERAMIC_YSZ": false,
          "materials_RD_FIBER": false,
          "verbose_print_timing": false,
          "verbose_idler_data_events": false,
          "log_extrusion_metrics": false,
          "spool_break_debug": false,
          "paused_movable_printhead": false,
          "midprint_nozzle_replace": false,
          "advanced_control": false,
          "high_res_touchoffs": true,
          "dislocation_recovery": true,
          "power_off_recovery": false,
          "change_access_key": true,
          "reboot_watchdog_interval": 7.5,
          "turbo_print_250um": true,
          "gantry_calibration_utility": true,
          "correct_gantry_error": true,
          "motion_and_rigidity_utility": false,
          "proxy_support": true,
          "lan_support": true,
          "preventative_maintenance": false,
          "metal_jam_troubleshooting": true,
          "sync_firmware_on_boot": true,
          "measure_z_scale_preprint": true,
          "measure_z_scale_utility": true,
          "correct_gantry_z_error": true,
          "prompt_ab_transition": false,
          "blacksmith_failure_detection": true,
          "lts_version": false,
          "oom_endpoint": true,
          "inspection_enabled": true,
          "iot_core": true,
          "staged_rollout_upload_during_printing": true,
          "staged_rollout_upload_hawkeye_during_printing": true,
          "fx20_use_default_rtd_calibration": true,
          "pause_on_repeat_mei": true,
          "staged_rollout_record_ui": true,
          "migrate_to_mfp_230": true
      },
      "plasticGainValue": 0.98536,
      "fiberGainValue": 1,
      "gantryCalibrationActive": false,
      "gantryZCalibrationActive": false,
      "extruder": 0
  },
  "printer_info": {
      "last_updated": "2025-03-14T16:23:41.498Z",
      "name": "Ever Given",
      "total_prints": 1135,
      "prints_completed": 930,
      "prints_cancelled": 228,
      "total_print_time": 30294442419,
      "kit_type": 2,
      "printer_rev": 1
  },
  "type": "PrinterUpdate",
  "serverTimestamp": "2025-03-14T16:54:53.833Z"
};

function WsDispatcher() {

  const [content, setContent] = useState(JSON.stringify(wsMsg1, null, 2));

  const dispatchWsMessage = () => {
    console.log('>>>>>>>');
    console.log(content);
    fetch('/mock-api/send-ws-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content,
      // body: JSON.stringify(JSON.parse(content)),
    });
  }


  return (
    <>
      <h3>WS message</h3>
      <div className="ws-dispatcher">
        <TextArea value={content} onChange={(e) => setContent(e.target.value)}  />
        <Button variant="primary" onClick={dispatchWsMessage}>Send</Button>
      </div>
    </>
  )
}

export default WsDispatcher;

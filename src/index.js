import grapesjs from 'grapesjs';

const stopPropagation = e => e.stopPropagation();

export default grapesjs.plugins.add('gjs-plugin-ckeditor5', (editor, opts = {}) => {
  console.log("Adding plugin grapesjs-plugin-ckeditor5");
  let c = opts;

  let defaults = {
    // CKEditor options
    options: {},

    // On which side of the element to position the toolbar
    // Available options: 'left|center|right'
    position: 'left',
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }

  if (!InlineEditor) {
    throw new Error('ckeditor5 InlineEditor instance not found, check cdn load');
  }
  console.log("About to set up ckeditor5");
  
  editor.setCustomRte({
      enable: async (el, rte) => {
        console.log("Enable custom rte");
        console.log(el);
        console.log(rte);
        // If already exists I'll just focus on it
        if (rte) {
          console.log("Already exists");
          console.log(rte);
          el.contentEditable = true;
          let rteToolbar = editor.RichTextEditor.getToolbarEl();
          console.log(rteToolbar);
          console.log(rteToolbar.firstChild)
          rteToolbar.firstChild.style.display = "none";
          editor.RichTextEditor.updatePosition();

          // [].forEach.call(rteToolbar.children, (child) => {
          //   child.style.display = 'none';
          // });
          console.log('if rte 1 ', rte);
          await rte.then(e => {
            rte = e;
            // e.ui.view.toolbar.element.style.display = 'block';
          });
          console.log(rte);
          return rte;
        }

        // Seems like 'sharedspace' plugin doesn't work exactly as expected
        // so will help hiding other toolbars already created
        // let rteToolbar = editor.RichTextEditor.getToolbarEl();
        // [].forEach.call(rteToolbar.children, (child) => {
        //   child.style.display = 'none';
        // });

        // Init CkEditors
        rte = await InlineEditor
          .create(el, {
            language: 'pt-br'
          }).catch(error => {
            console.error(error);
          }
          );
        console.log("Create");
        console.log(rte);
        // hide grapesjs rte toolbar
        let rteToolbar = editor.RichTextEditor.getToolbarEl();
        rteToolbar.firstChild.style.display = "none";
        editor.RichTextEditor.updatePosition();

        if (rte) {
          // // Prevent blur when some of CKEditor's element is clicked
          rte.on('mousedown', e => {
            const editorEls = grapesjs.$('.gjs-rte-toolbar');
            ['off', 'on'].forEach(m => editorEls[m]('mousedown', stopPropagation));
          });

          editor.RichTextEditor.getToolbarEl().appendChild(rte.ui.view.toolbar.element);
          el.contentEditable = true;
        } else {
          console.log('Editor was not initialized');
        }
        console.log("Ending enable");
        console.log(rte);
        return rte;
      },

      disable: async (el, rte) => {
        console.log("Custom rte disable function");
        console.log(rte);
        // let instance = await rte;
        // console.log(instance);
        // // el.contentEditable = false;
        // await instance.destroy();
        // console.log("destroyed rte");
        // console.log(el);
        el.contentEditable = false;
      }
    });


    // focus(el, rte) {
    //   // Do nothing if already focused
    //   if (rte && rte.focusManager.hasFocus) {
    //     return;
    //   }
    //   el.contentEditable = true;
    //   rte && rte.focus();
    // }

  // // Update RTE toolbar position
  // editor.on('rteToolbarPosUpdate', (pos) => {
  //   // Update by position
  //   switch (c.position) {
  //     case 'center':
  //       let diff = (pos.elementWidth / 2) - (pos.targetWidth / 2);
  //       pos.left = pos.elementLeft + diff;
  //       break;
  //     case 'right':
  //       let width = pos.targetWidth;
  //       pos.left = pos.elementLeft + pos.elementWidth - width;
  //       break;
  //   }

  //   if (pos.top <= pos.canvasTop) {
  //     pos.top = pos.elementTop + pos.elementHeight;
  //   }

  //   // Check if not outside of the canvas
  //   if (pos.left < pos.canvasLeft) {
  //     pos.left = pos.canvasLeft;
  //   }
  // });

});

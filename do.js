// Sorvilier point cloud in scene 1
		Potree.loadPointCloud("./pointclouds/PoTree_Kapliczka_test1/metadata.json", "PoTree_Kapliczka_test1", function(e){
			sceneSG.addPointCloud(e.pointcloud);
			
			let material = e.pointcloud.material;
			material.size = 1;
			material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

			{
				{
					let elTitle = $(`
						<span>
							About Annotations
							<img src="${Potree.resourcePath}/icons/goto.svg" 
								name="action_set_scene"
								class="annotation-action-icon" 
								style="filter: invert(1);" />
						</span>
					`);
					elTitle.find("img[name=action_set_scene]").click( (event) => {
						event.stopPropagation();
						viewer.setScene(sceneLion); 
					});
					elTitle.toString = () => "About Annotations";

					let aAbout1 = new Potree.Annotation({
						position: [590043.63, 231490.79, 740.78],
						title: elTitle,
						cameraPosition: [590105.53, 231541.63, 782.05],
						cameraTarget: [590043.63, 231488.79, 740.78],
						description: `<ul><li>Click on the annotation label to move a predefined view.</li> 
						<li>Click on the icon to execute the specified action.</li>
						In this case, the action will bring you to another scene and point cloud.</ul>`
					});

					sceneSG.annotations.add(aAbout1);
				}

				{
					let aAbout2 = new Potree.Annotation({
						position: [589621, 231437, 784],
						"cameraPosition": [589585.81, 231463.63, 804.00],
						"cameraTarget": [589625.86, 231439, 775.38],
						"title": "About Annotations 2",
						"description": `
						Suitable annotation positions and views can be obtained by 
						looking up the current camera position and target in the "Scene" panel, 
						or by evaluating following lines in your browser's developer console:<br><br>
						<code>viewer.scene.view.position</code><br>
						<code>viewer.scene.view.getPivot()</code><br>
						`
					});
					sceneSG.annotations.add(aAbout2);
				}

				{ // Annotation with action icons

					// Create title element with jquery
					let elTitle = $(`
						<span>
							<img name="action_elevation" src="${Potree.resourcePath}/icons/profile.svg" class="annotation-action-icon"/>
							<img name="action_rgb" src="${Potree.resourcePath}/icons/rgb.svg" class="annotation-action-icon"/>
						</span>`);
					elTitle.find("img[name=action_elevation]").click( () => {
						viewer.scene.pointclouds.forEach( pc => pc.material.pointColorType = Potree.PointColorType.ELEVATION );
					});
					elTitle.find("img[name=action_rgb]").click( () => {
						viewer.scene.pointclouds.forEach( pc => pc.material.pointColorType = Potree.PointColorType.RGB );
					});

					// Give the annotation a meaningful string representation for the sidebar
					elTitle.toString = () => "Elevation / RGB Actions";

					// Same as with other annotations, except title is a jquery object this time.
					let aActions = new Potree.Annotation({
						position: [590012.986, 231273.294, 787.162],
						title: elTitle
					});
					sceneSG.annotations.add(aActions);
				}

				{ // Annotation with action icons

					// Create title element with jquery
					let schemes = [
						{name: "SPECTRAL", icon: `${Potree.resourcePath}/icons/gradients_spectral.png`},
						{name: "YELLOW_GREEN", icon: `${Potree.resourcePath}/icons/gradients_yellow_green.png`},
						{name: "PLASMA", icon: `${Potree.resourcePath}/icons/gradients_plasma.png`},
						{name: "GRAYSCALE", icon: `${Potree.resourcePath}/icons/gradients_grayscale.png`},
						{name: "RAINBOW", icon: `${Potree.resourcePath}/icons/gradients_rainbow.png`},
					];

					let elTitle = $(`<span>Gradient Schemes:</span>`);
					for(let scheme of schemes){
						let button = $(`<img src="${scheme.icon}" class="annotation-action-icon" style="width: 2em; height: auto;"/>`);
						button.click( () => {
							for(let pointcloud of viewer.scene.pointclouds){
								pointcloud.material.pointColorType = Potree.PointColorType.ELEVATION;
								pointcloud.material.gradient = Potree.Gradients[scheme.name];
							}
						});
						elTitle.append(button);
					}

					// Give the annotation a meaningful string representation for the sidebar
					elTitle.toString = () => "Gradient Color Selection";

					// Same as with other annotations, except title is a jquery object this time.
					let aActions = new Potree.Annotation({
						position: [589577.396, 231267.514, 807.655],
						title: elTitle,
					});
					sceneSG.annotations.add(aActions);
				}
				
				{
					let aTrees = new Potree.Annotation({
						position: [589850.15, 231300.10, 770.94],
						title: "Trees",
						description: `Point cloud of a small section in Sorvilier, Switzerland. <br>
							Courtesy of sigeom.sa`,
					});
					aTrees.domElement.off("mouseenter");
					aTrees.domElement.off("mouseleave");
					aTrees.addEventListener("click", () => {
						aTrees.setHighlighted(!aTrees.isHighlighted);
					});
					sceneSG.annotations.add(aTrees);
				}
			}
		});
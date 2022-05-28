import React, {Fragment, useState} from "react";
import {Helmet} from "react-helmet";
import {Navbar, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from "../CSS/Base.module.css";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import {useFolder} from "../../hooks/useFolder";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import {useParams, useLocation} from "react-router-dom";
import File from "./File";

export default function Dashboard() {
	const {folderId} = useParams();
	// const { state = {} } = useLocation()
	const {folder, childFolders, childFiles} = useFolder(folderId); // state.folder

	return (
		<Fragment>
			<Helmet>
				{/****** Inline CSS ******/}
				<style>
					{`
                        html{
                            min-width: 100vw;
                            margin: 0;
                        }
                        p{
                            margin: 0;
                            color: #182850;
                        }
                        table{
                            border-collapse: collapse;
                        }
                        th, tr  {
                            font-family: Roboto-Bold;
                            border-bottom: solid 2px !important;
                            border-color: lightgray !important;
                        }
                        th, td {
                            color: #182850;
                            text-align:left
                            margin: 0 auto;
                        }
                        th {
                            font-size: 1.2rem;
                        }
                        td {
                            vertical-align: middle;
                        }
                        tbody>tr>:nth-child(4) {
                            text-align:center;
                        }

                        .white-text {
                            color: white;
                        }
                        .navbar {
                            font-family: Roboto-Bold;
                            font-size: 20px !important;
                        }
                        .fa-file-circle-plus, .fa-folder-plus, .fa-file, .fa-folder{
                            font-size: 1.5rem;
                        }
                        .fa-file-circle-plus, .fa-folder-plus {
                            color: mediumaquamarine;
                            padding-right: 10px;
                        }
                        .fa-file {
                            color: dodgerblue;
                        }
                        .fa-folder {
                            color: midnightblue;
                        }
                        .text-deco {
                            text-decoration: none;
                        }
                        .white-text {
                            color: white;                            
                        }
                    `}
				</style>
			</Helmet>

			{/**************** Navbar 1 ******************/}
			<Navbar className={["col-12", styles.navbarHead]}>
				<Navbar.Brand
					className={[
						styles.navbarBrand,
						styles.fontBebasNeue,
						styles.fontSpacing,
					]}
				>
					<p className="fs-2 fw-normal">
						<span className="white-text">
							<Link to="/manage" className="text-deco white-text">
								BACK
							</Link>
						</span>{" "}
						/FILE REPOSITORY
					</p>
				</Navbar.Brand>
			</Navbar>

			{/**************** Navbar 2 ******************/}
			<Container fluid>
				<div className="d-flex align-items-center">
					<FolderBreadcrumbs currentFolder={folder} />
					<AddFileButton currentFolder={folder} />
					<AddFolderButton currentFolder={folder} />
				</div>
				{childFolders.length > 0 && (
					<div className="d-flex flex-wrap">
						{childFolders.map((childFolder) => (
							<div
								key={childFolder.id}
								style={{maxWidth: "200px"}}
								className="p-2"
							>
								<Folder folder={childFolder} />
							</div>
						))}
					</div>
				)}
				{childFolders.length > 0 && childFiles.length > 0 && <hr />}
				{childFiles.length > 0 && (
					<div className="d-flex flex-wrap">
						{childFiles.map((childFile) => (
							<div
								key={childFile.id}
								style={{maxWidth: "200px"}}
								className="p-2"
							>
								<File file={childFile} />
							</div>
						))}
					</div>
				)}
			</Container>

			{/**************** Table ******************/}

			{/************** Table Body ***************/}
		</Fragment>
	);
}

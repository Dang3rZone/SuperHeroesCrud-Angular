import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SuperheroesCrud';
  displayedColumns: string[] = [
    'name',
    'category',
    'dateBirth',
    'power',
    'id',
    'about',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllSupes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.getAllSupes();
      }
    });
  }

  getAllSupes(): void {
    this.api.getSupe().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error('Error while getting superheroes:', err);
        alert('Error while getting superheroes');
      },
    });
  }

  editSupe(row: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getAllSupes();
      }
    });
  }

  deleteSupe(id: number): void {
    this.api.deleteSupe(id).subscribe({
      next: () => {
        alert('Successfully deleted superhero');
        this.getAllSupes();
      },
      error: (err: any) => {
        console.error('Error while deleting superhero:', err);
        alert('Error while deleting superhero');
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

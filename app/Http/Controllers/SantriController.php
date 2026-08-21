<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Santri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

class SantriController extends Controller
{
    public function index(Request $request)
    {
        $query = Santri::query();

        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('nis', 'like', '%' . $request->search . '%');
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->jenjang) {
            $query->where('jenjang', $request->jenjang);
        }

        $santri = $query->latest()->paginate(10);

        // Generate URLs for existing files through proxy
        $santri->getCollection()->transform(function ($s) {
            $s->foto_url = ($s->foto && $s->foto !== '0' && $s->foto !== 0) ? route('santri.foto', $s) : null;
            return $s;
        });

        return Inertia::render('Santri/Index', [
            'santri' => $santri,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
            'filters' => $request->only(['search', 'status', 'jenjang']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Santri/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nis' => 'required|string|unique:santri,nis',
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'nomor_hp' => 'required|string|max:20',
            'jenjang' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'status' => 'required|in:aktif,tidak_aktif',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $santri = Santri::create($validated);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('santri/foto');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil disimpan');
    }

    public function show(Santri $santri)
    {
        // Generate URL for existing file through proxy
        $santri->foto_url = ($santri->foto && $santri->foto !== '0' && $santri->foto !== 0) ? route('santri.foto', $santri) : null;

        return Inertia::render('Santri/Show', [
            'santri' => $santri,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
        ]);
    }

    public function showFoto(Santri $santri)
    {
        if (!$santri->foto || $santri->foto === '0' || $santri->foto === 0) {
            abort(404);
        }

        $file = Storage::get($santri->foto);
        $mimeType = Storage::mimeType($santri->foto);

        return response($file)->header('Content-Type', $mimeType);
    }

    public function edit(Santri $santri)
    {
        // Generate URL for existing file through proxy
        $santri->foto_url = ($santri->foto && $santri->foto !== '0' && $santri->foto !== 0) ? route('santri.foto', $santri) : null;

        return Inertia::render('Santri/Edit', [
            'santri' => $santri,
        ]);
    }

    public function update(Request $request, Santri $santri)
    {
        $validated = $request->validate([
            'nis' => 'required|string|unique:santri,nis,' . $santri->id,
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'nomor_hp' => 'required|string|max:20',
            'jenjang' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'status' => 'required|in:aktif,tidak_aktif',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        // Remove file fields from validated data to prevent overwriting with null
        $validated = array_diff_key($validated, array_flip(['foto']));

        $santri->update($validated);

        if ($request->hasFile('foto')) {
            if ($santri->foto) {
                Storage::delete($santri->foto);
            }
            $fotoPath = $request->file('foto')->store('santri/foto');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil diubah');
    }

    public function destroy(Santri $santri)
    {
        if ($santri->foto) {
            Storage::delete($santri->foto);
        }

        $santri->delete();

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil dihapus');
    }

    /**
     * Download Excel template for import
     */
    public function downloadTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Set headers
        $headers = [
            'nis',
            'nama',
            'jenis_kelamin',
            'tempat_lahir',
            'tanggal_lahir',
            'nama_ayah',
            'nama_ibu',
            'alamat',
            'nomor_hp',
            'jenjang',
            'kelas',
            'status',
            'catatan'
        ];

        // Write headers in first row
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '1', $header);
            $col++;
        }

        // Style header row
        $headerRange = 'A1:M1';
        $sheet->getStyle($headerRange)->getFont()->setBold(true);

        // Add example data in second row
        $exampleData = [
            '24001',
            'Ahmad Fauzan',
            'laki-laki',
            'Sidoarjo',
            '2012-05-10',
            'Budi',
            'Siti',
            'Jl. Contoh No. 123',
            '08123456789',
            'SMP',
            '7A',
            'aktif',
            '-'
        ];

        $col = 'A';
        foreach ($exampleData as $value) {
            $sheet->setCellValue($col . '2', $value);
            $col++;
        }

        // Add note about valid values
        $sheet->setCellValue('A6', 'CATATAN:');
        $sheet->setCellValue('A7', 'jenis_kelamin: laki-laki, perempuan');
        $sheet->setCellValue('A8', 'jenjang: SD, SMP, SMA');
        $sheet->setCellValue('A9', 'status: aktif, tidak aktif');
        $sheet->setCellValue('A10', 'foto: Upload terpisah dari admin');
        $sheet->getStyle('A6:A10')->getFont()->setItalic(true);

        // Auto-size columns
        foreach (range('A', 'M') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }

        // Set column width for address column
        $sheet->getColumnDimension('H')->setWidth(30);

        // Save to temporary file
        $fileName = 'template-santri.xlsx';
        $tempFile = storage_path('app/temp/' . $fileName);
        if (!file_exists(dirname($tempFile))) {
            mkdir(dirname($tempFile), 0755, true);
        }

        $writer = new Xlsx($spreadsheet);
        $writer->save($tempFile);

        // Download and cleanup
        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
    }

    /**
     * Preview import data from ZIP file
     */
    public function previewImport(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls|max:10240', // 10MB max
        ]);

        $excelFile = $request->file('excel_file');
        $tempDir = storage_path('app/temp/import_' . time() . '_' . Str::random(8));

        try {
            // Create temp directory
            if (!file_exists($tempDir)) {
                mkdir($tempDir, 0755, true);
            }

            // Store uploaded file
            $excelPath = $tempDir . '/data-santri.xlsx';
            $excelFile->move($tempDir, 'data-santri.xlsx');

            // Parse Excel file
            $rows = $this->parseExcelFile($excelPath);

            if (empty($rows)) {
                $this->cleanupTempDir($tempDir);
                return response()->json([
                    'error' => 'File data kosong atau tidak dapat dibaca.'
                ], 400);
            }

            // Validate and prepare data
            $validData = [];
            $errors = [];
            $existingNis = Santri::pluck('nis')->toArray();

            foreach ($rows as $index => $row) {
                $rowNum = $index + 2; // +2 because row 1 is header
                $rowErrors = [];

                // Skip empty rows
                if (empty(array_filter($row))) {
                    continue;
                }

                // Map Excel columns to array keys
                $data = [
                    'nis' => $row[0] ?? '',
                    'nama' => $row[1] ?? '',
                    'jenis_kelamin' => $row[2] ?? '',
                    'tempat_lahir' => $row[3] ?? '',
                    'tanggal_lahir' => $row[4] ?? '',
                    'nama_ayah' => $row[5] ?? '',
                    'nama_ibu' => $row[6] ?? '',
                    'alamat' => $row[7] ?? '',
                    'nomor_hp' => $row[8] ?? '',
                    'jenjang' => $row[9] ?? '',
                    'kelas' => $row[10] ?? '',
                    'status' => $row[11] ?? '',
                    'catatan' => $row[12] ?? '',
                ];

                // Convert Excel date format if needed
                if (!empty($data['tanggal_lahir'])) {
                    // Check if it's a numeric Excel date
                    if (is_numeric($data['tanggal_lahir'])) {
                        $data['tanggal_lahir'] = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($data['tanggal_lahir'])->format('Y-m-d');
                    }
                }

                // Validate NIS
                if (empty($data['nis'])) {
                    $rowErrors[] = 'NIS wajib diisi';
                } elseif (in_array($data['nis'], $existingNis)) {
                    $rowErrors[] = 'NIS sudah terdaftar';
                }

                // Validate nama
                if (empty($data['nama'])) {
                    $rowErrors[] = 'Nama wajib diisi';
                }

                // Validate jenis_kelamin
                $validJenisKelamin = ['laki-laki', 'perempuan'];
                if (!empty($data['jenis_kelamin']) && !in_array(strtolower($data['jenis_kelamin']), $validJenisKelamin)) {
                    $rowErrors[] = 'jenis_kelamin harus laki-laki/perempuan';
                }

                // Validate jenjang
                $validJenjang = ['sd', 'smp', 'sma', 'SD', 'SMP', 'SMA'];
                if (!empty($data['jenjang']) && !in_array($data['jenjang'], $validJenjang)) {
                    $rowErrors[] = 'jenjang harus SD/SMP/SMA';
                }

                // Validate status
                $validStatus = ['aktif', 'tidak aktif'];
                if (!empty($data['status']) && !in_array(strtolower($data['status']), $validStatus)) {
                    $rowErrors[] = 'status harus aktif/tidak aktif';
                }

                // Validate tanggal_lahir
                if (!empty($data['tanggal_lahir'])) {
                    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['tanggal_lahir'])) {
                        $rowErrors[] = 'format tanggal_lahir harus YYYY-MM-DD';
                    } else {
                        $dateParts = explode('-', $data['tanggal_lahir']);
                        if (!checkdate($dateParts[1], $dateParts[2], $dateParts[0])) {
                            $rowErrors[] = 'tanggal_lahir tidak valid';
                        }
                    }
                }

                if (empty($rowErrors)) {
                    // Convert jenis_kelamin to DB format
                    $jenisKelaminMap = [
                        'laki-laki' => 'L',
                        'perempuan' => 'P'
                    ];
                    $data['jenis_kelamin'] = $jenisKelaminMap[strtolower($data['jenis_kelamin'])] ?? $data['jenis_kelamin'];

                    // Convert jenjang to uppercase for consistency
                    $data['jenjang'] = strtoupper($data['jenjang']);

                    // Convert status to DB format
                    $statusMap = [
                        'aktif' => 'aktif',
                        'tidak aktif' => 'tidak_aktif'
                    ];
                    $data['status'] = $statusMap[strtolower($data['status'])] ?? $data['status'];

                    $validData[] = [
                        'data' => $data,
                        'row_num' => $rowNum
                    ];
                } else {
                    $errors[] = [
                        'row' => $rowNum,
                        'nis' => $data['nis'],
                        'errors' => $rowErrors
                    ];
                }
            }

            // Store temp data for next step
            $importId = 'import_' . time() . '_' . Str::random(12);
            $importData = [
                'temp_dir' => $tempDir,
                'valid_data' => $validData,
                'errors' => $errors,
                'total_rows' => count($rows),
                'valid_count' => count($validData),
                'error_count' => count($errors),
            ];

            // Store in cache for 1 hour
            cache()->put($importId, $importData, 3600);

            return response()->json([
                'import_id' => $importId,
                'total_rows' => $importData['total_rows'],
                'valid_count' => $importData['valid_count'],
                'error_count' => $importData['error_count'],
                'errors' => $errors
            ]);

        } catch (\Exception $e) {
            $this->cleanupTempDir($tempDir);
            return response()->json([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Execute import
     */
    public function executeImport(Request $request)
    {
        $request->validate([
            'import_id' => 'required|string',
        ]);

        $importData = cache()->get($request->import_id);

        if (!$importData) {
            return response()->json([
                'error' => 'Sesi import tidak ditemukan atau telah kadaluarsa.'
            ], 400);
        }

        try {
            DB::beginTransaction();

            $importedCount = 0;

            foreach ($importData['valid_data'] as $item) {
                $data = $item['data'];

                // Create santri
                $santri = Santri::create($data);

                $importedCount++;
            }

            DB::commit();

            // Cleanup temp directory
            $this->cleanupTempDir($importData['temp_dir']);

            // Clear cache
            cache()->forget($request->import_id);

            return response()->json([
                'success' => true,
                'imported_count' => $importedCount,
                'skipped_count' => $importData['error_count'],
                'message' => "Import berhasil. {$importedCount} data Santri berhasil ditambahkan."
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            $this->cleanupTempDir($importData['temp_dir']);
            cache()->forget($request->import_id);

            return response()->json([
                'error' => 'Terjadi kesalahan saat import: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Parse Excel file
     */
    private function parseExcelFile($filePath)
    {
        $rows = [];

        try {
            $spreadsheet = IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();
            $highestRow = $sheet->getHighestRow();
            $highestColumn = $sheet->getHighestColumn();

            // Skip header row (row 1), start from row 2
            for ($row = 2; $row <= $highestRow; $row++) {
                $rowData = [];
                for ($col = 'A'; $col <= 'M'; $col++) {
                    $cellValue = $sheet->getCell($col . $row)->getValue();
                    $rowData[] = $cellValue;
                }
                // Only add non-empty rows
                if (array_filter($rowData)) {
                    $rows[] = $rowData;
                }
            }
        } catch (\Exception $e) {
            // If parsing fails, return empty array
            return [];
        }

        return $rows;
    }

    /**
     * Cleanup temporary directory
     */
    private function cleanupTempDir($dir)
    {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    $path = $dir . '/' . $file;
                    if (is_dir($path)) {
                        $this->cleanupTempDir($path);
                    } else {
                        unlink($path);
                    }
                }
            }
            rmdir($dir);
        }
    }
}
